import React, { Component, useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions';

import { WaveformContainer, Wave, PlayButton } from "./Waveform.styled";

const WaveFormContainer = () => {
  const [playing, setPlaying] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [waveform, setWaveform] = useState(null);
  const handlePlay = () => {
    setPlaying((prev) => !prev);
    waveform.playPause();
  };

  const playRegion = (region) => {
    region.play()
  }
  const pauseRegion = () => {
    waveform.pause()
  }

  const copy = (region, instance) => {
    var segmentDuration = region.end - region.start

    var originalBuffer = instance.backend.buffer;
    var emptySegment = instance.backend.ac.createBuffer(
        originalBuffer.numberOfChannels,
        segmentDuration * originalBuffer.sampleRate,
        originalBuffer.sampleRate
    );
    for (var i = 0; i < originalBuffer.numberOfChannels; i++) {
        var chanData = originalBuffer.getChannelData(i);
        var emptySegmentData = emptySegment.getChannelData(i);
        var mid_data = chanData.subarray( region.start * originalBuffer.sampleRate, region.end * originalBuffer.sampleRate);
        emptySegmentData.set(mid_data);
    }
    console.log({
      emptySegment
    })
    return emptySegment
  }

  useEffect(() => {
    const track = document.querySelector("#track");

    const waveformInstance = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: "#waveform",
      backend: "WebAudio",
      height: 80,
      progressColor: "#2D5BFF",
      responsive: true,
      waveColor: "#EFEFEF",
      cursorColor: "transparent",
      plugins: [
        RegionsPlugin.create({
          regionsMinLength: 2,
          regions: [
            {
              start: 1,
              end: 5,
              loop: false,
              color: "hsla(200, 100%, 30%, 0.5)",
            },
          ],
          dragSelection: {
            slop: 5,
          },
        }),
      ],
    });
    waveformInstance.load(track);
    waveformInstance.on("ready", () => {
      console.log("ready is called!!");
      setTotal(waveformInstance.getDuration().toFixed(1));
    });
    waveformInstance.on("audioprocess", () => {
      if (waveformInstance.isPlaying()) {
        const currentTime = waveformInstance.getCurrentTime();
        setCurrent(currentTime.toFixed(1));
      }
    });
    waveformInstance.on("region-created", () => {
      console.log("region created");
    });
    setWaveform(waveformInstance);
    console.log({
      waveformInstance,
    });
  }, []);

  const url = "https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3";

  return (
    <WaveformContainer>
      <PlayButton onClick={handlePlay}>
        {!playing ? "Playa" : "Pause"}
      </PlayButton>
      <Wave id="waveform" />
      <audio id="track" src={url} />
      <p>{current}</p> / <p>{total}</p>
      <br />
      <div>
      {
        // @ts-ignore
        waveform && Object.values(waveform.regions.list).map((region: any) =>  {
          return <div key={region.id} >
            <button onClick={() => playRegion(region)}>Play region {region.id}</button>
            <button onClick={() => pauseRegion()}>Pause region {region.id}</button>
            <button onClick={() => copy(region, waveform)}>
              Copy region {region.id}
            </button>
          </div>
        })
      }
      </div>
    </WaveformContainer> 
  );
};

export default WaveFormContainer;
