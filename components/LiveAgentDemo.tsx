import React, { useEffect, useRef, useState } from 'react';
import { Visualizer } from './Visualizer';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { arrayBufferToBase64, base64ToArrayBuffer, float32ToInt16 } from '../utils';

export const LiveAgentDemo: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const cleanup = async () => {
    if (sessionRef.current) {
        const session = await sessionRef.current;
        session.close();
        sessionRef.current = null;
    }
    
    if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
    }

    if (inputAudioContextRef.current) {
        await inputAudioContextRef.current.close();
        inputAudioContextRef.current = null;
    }

    if (audioContextRef.current) {
        await audioContextRef.current.close();
        audioContextRef.current = null;
    }

    sourcesRef.current.forEach(source => source.stop());
    sourcesRef.current.clear();
    
    setIsConnected(false);
    setIsSpeaking(false);
  };

  const startSession = async () => {
    setError(null);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        inputAudioContextRef.current = inputCtx;
        
        const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        audioContextRef.current = outputCtx;
        nextStartTimeRef.current = 0;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        streamRef.current = stream;

        const sessionPromise = ai.live.connect({
            model: 'gemini-2.5-flash-native-audio-preview-12-2025',
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
                },
                systemInstruction: 'You are a helpful real estate AI receptionist named Propel. Be professional, concise, and helpful.'
            },
            callbacks: {
                onopen: () => {
                    setIsConnected(true);
                    
                    const source = inputCtx.createMediaStreamSource(stream);
                    const processor = inputCtx.createScriptProcessor(4096, 1, 1);
                    
                    processor.onaudioprocess = (e) => {
                        const inputData = e.inputBuffer.getChannelData(0);
                        const pcmData = float32ToInt16(inputData);
                        const base64 = arrayBufferToBase64(pcmData.buffer);
                        
                        sessionPromise.then(session => {
                            session.sendRealtimeInput({
                                media: {
                                    mimeType: 'audio/pcm;rate=16000',
                                    data: base64
                                }
                            });
                        });
                    };
                    
                    source.connect(processor);
                    processor.connect(inputCtx.destination);
                },
                onmessage: async (msg: LiveServerMessage) => {
                    const inlineData = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData;
                    if (inlineData && inlineData.data) {
                        const audioData = base64ToArrayBuffer(inlineData.data);
                        const int16Data = new Int16Array(audioData);
                        
                        const buffer = outputCtx.createBuffer(1, int16Data.length, 24000);
                        const channelData = buffer.getChannelData(0);
                        for(let i=0; i<int16Data.length; i++) {
                            channelData[i] = int16Data[i] / 32768.0;
                        }

                        const source = outputCtx.createBufferSource();
                        source.buffer = buffer;
                        source.connect(outputCtx.destination);
                        
                        const currentTime = outputCtx.currentTime;
                        if (nextStartTimeRef.current < currentTime) {
                            nextStartTimeRef.current = currentTime;
                        }
                        
                        source.start(nextStartTimeRef.current);
                        nextStartTimeRef.current += buffer.duration;
                        
                        source.onended = () => {
                            sourcesRef.current.delete(source);
                            if (sourcesRef.current.size === 0) {
                                setIsSpeaking(false);
                            }
                        };
                        sourcesRef.current.add(source);
                        setIsSpeaking(true);
                    }

                    if (msg.serverContent?.interrupted) {
                        sourcesRef.current.forEach(s => s.stop());
                        sourcesRef.current.clear();
                        nextStartTimeRef.current = 0;
                        setIsSpeaking(false);
                    }
                },
                onclose: () => {
                    cleanup();
                },
                onerror: (e) => {
                    console.error('Session error', e);
                    setError('Connection failed');
                    cleanup();
                }
            }
        });
        sessionRef.current = sessionPromise;
    } catch (err) {
        console.error(err);
        setError('Failed to start session');
        cleanup();
    }
  };

  useEffect(() => {
    return () => {
        cleanup();
    };
  }, []);

  return (
    <div className="relative group">
      {/* Decorative Glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 transition duration-1000 group-hover:duration-200 ${isConnected ? 'opacity-50 animate-pulse' : ''}`}></div>
      
      <div className="relative glass-panel rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] w-full max-w-md mx-auto">
        
        {/* Main Text */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-semibold text-white mb-2">Talk to Propel AI</h3>
          <p className="text-gray-400 text-sm">Experience the receptionist that <br/>closes deals while you sleep.</p>
        </div>

        {/* Visualizer and Controls */}
        <div className="w-full flex flex-col items-center gap-8">
            <div className="w-full h-32 flex items-center justify-center">
                <Visualizer isActive={isConnected} isSpeaking={isSpeaking} />
            </div>

            <button 
                onClick={isConnected ? cleanup : startSession}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isConnected 
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 ring-2 ring-red-500/50' 
                        : 'bg-white/10 text-white hover:bg-white/20 ring-2 ring-white/20'
                }`}
            >
                {isConnected ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                )}
            </button>
        </div>
        
        <div className="mt-8 text-xs text-gray-500">
           {isConnected ? "Listening..." : "Tap the mic to start speaking"}
        </div>
        {error && (
            <div className="mt-4 text-xs text-red-400">
                {error}
            </div>
        )}
      </div>
    </div>
  );
};