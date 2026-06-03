import voiceoverData from "../../public/scam-smart/scam_smart_voiceovers.json";

let currentAudio = null;
let currentText = null;

function normalizeText(text) {
  if (!text) return "";
  // Remove brackets and content inside brackets, e.g., [serious], [focused]
  let cleaned = text.replace(/\[[^\]]*\]/g, "");
  // Keep only alphanumeric characters and make lowercase
  cleaned = cleaned.toLowerCase().replace(/[^a-z0-9]/g, "");
  return cleaned;
}

export function stopVoiceover() {
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch (e) {
      console.error("Failed to pause voiceover", e);
    }
    currentAudio = null;
  }
  currentText = null;
}

export function pauseVoiceover() {
  if (currentAudio && !currentAudio.paused) {
    try {
      currentAudio.pause();
    } catch (e) {
      console.error("Failed to pause voiceover", e);
    }
  }
}

export function resumeVoiceover() {
  if (currentAudio && currentAudio.paused) {
    currentAudio.play().catch(err => {
      console.warn("Failed to resume voiceover", err);
    });
  }
}

export function playVoiceoverForText(text) {
  if (!text) {
    stopVoiceover();
    return;
  }

  const target = normalizeText(text);
  if (!target) {
    stopVoiceover();
    return;
  }

  // If the same voiceover is already loaded and is paused, just resume it
  if (currentAudio && currentText === target) {
    if (currentAudio.paused) {
      resumeVoiceover();
    }
    return;
  }

  // Stop whatever is playing first
  stopVoiceover();

  // Find index in voiceoverData
  const index = voiceoverData.findIndex(
    (item) => normalizeText(item.text) === target
  );

  if (index !== -1) {
    const src = `/scam-smart/output/output_${index}.mp3`;
    const audio = new Audio(src);
    audio.volume = 1.0;
    audio.playbackRate = 1.15;
    currentAudio = audio;
    currentText = target;
    audio.play().catch((err) => {
      console.warn(`Voiceover play blocked or failed for index ${index}`, err);
    });
  } else {
    console.warn(`No voiceover match found for text: "${text}" (normalized: "${target}")`);
  }
}
