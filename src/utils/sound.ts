let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

export const playTone = (freq: number, type: OscillatorType = 'sine', duration = 0.1, gainVal = 0.05) => {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {
    // AudioContext blocked or unsupported
  }
};

export const playSfx = (type: 'click' | 'keypress' | 'success') => {
  if (!soundEnabled) return;
  if (type === 'click') {
    playTone(600, 'sine', 0.05, 0.04);
  } else if (type === 'keypress') {
    playTone(400 + Math.random() * 150, 'triangle', 0.03, 0.03);
  } else if (type === 'success') {
    playTone(440, 'sine', 0.1, 0.08);
    setTimeout(() => playTone(659, 'sine', 0.15, 0.1), 80);
  }
};
