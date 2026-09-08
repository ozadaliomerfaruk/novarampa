import fs from "node:fs";
import { spawnSync } from "node:child_process";
const ff = process.env.FFMPEG_PATH || "ffmpeg";
const dir = process.argv[2] || ".playwright-mcp/stock";
function run(args) {
  const r = spawnSync(
    ff,
    ["-hide_banner", "-loglevel", "error", "-y", ...args],
    { encoding: "utf8", maxBuffer: 5e6 },
  );
  if (r.status !== 0) throw Error(r.stderr);
}
// Each source is a 90-frame segment at 25fps, cropped/graded consistently.
const clips = [
  {
    key: "ramp",
    args: ["-loop", "1", "-i", dir + "/ramp.jpg"],
    filter:
      "scale=2560:-1,crop=2560:1440,zoompan=z='1.16+on*0.0007':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=90:s=1280x720:fps=25",
  },
  {
    key: "forklift",
    args: ["-ss", "3", "-i", dir + "/forklift.mp4"],
    filter: "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720",
  },
  {
    key: "welding",
    args: ["-ss", "0.5", "-i", dir + "/welding.mp4"],
    filter: "crop=1920:1080:120:300,scale=1280:720",
  },
  {
    key: "grinder",
    args: ["-ss", "1", "-i", dir + "/grinder.mp4"],
    filter: "scale=1280:720",
  },
  {
    key: "hammer",
    args: ["-ss", "2", "-i", dir + "/hammer-modern.mp4"],
    filter: "crop=1080:608:0:1250,scale=1280:720",
  },
  {
    key: "bandsaw",
    args: ["-ss", "1", "-i", dir + "/bandsaw.mp4"],
    filter: "scale=1280:720",
  },
];
for (const clip of clips) {
  run([
    ...clip.args,
    "-vf",
    clip.filter +
      ",fps=25,setsar=1,eq=contrast=1.045:saturation=0.6:brightness=-0.018,format=yuv420p",
    "-frames:v",
    "90",
    "-an",
    "-c:v",
    "libx264",
    "-preset",
    "fast",
    "-crf",
    "18",
    dir + "/segment-" + clip.key + ".mp4",
  ]);
  console.log("segment " + clip.key);
}
let filters = [];
let joins = [];
for (let i = 0; i < clips.length; i++) {
  filters.push("[" + i + ":v]split=3[s" + i + "][h" + i + "][t" + i + "]");
  filters.push(
    "[s" +
      i +
      "]trim=start_frame=10:end_frame=80,setpts=PTS-STARTPTS[body" +
      i +
      "]",
  );
  filters.push(
    "[h" +
      i +
      "]trim=start_frame=0:end_frame=10,setpts=PTS-STARTPTS[head" +
      i +
      "]",
  );
  filters.push(
    "[t" +
      i +
      "]trim=start_frame=80:end_frame=90,setpts=PTS-STARTPTS[tail" +
      i +
      "]",
  );
  joins.push("[body" + i + "][fade" + i + "]");
}
for (let i = 0; i < clips.length; i++)
  filters.push(
    "[tail" +
      i +
      "][head" +
      ((i + 1) % clips.length) +
      "]blend=all_expr='A*(1-T/0.4)+B*(T/0.4)':shortest=1[fade" +
      i +
      "]",
  );
filters.push(joins.join("") + "concat=n=12:v=1:a=0[out]");
run([
  ...clips.flatMap((c) => ["-i", dir + "/segment-" + c.key + ".mp4"]),
  "-filter_complex",
  filters.join(";"),
  "-map",
  "[out]",
  "-an",
  "-c:v",
  "libx264",
  "-preset",
  "slow",
  "-crf",
  "25",
  "-pix_fmt",
  "yuv420p",
  "-movflags",
  "+faststart",
  "public/videos/hero-workshop-loop.mp4",
]);
run([
  "-ss",
  "0",
  "-i",
  "public/videos/hero-workshop-loop.mp4",
  "-frames:v",
  "1",
  "-q:v",
  "3",
  "public/videos/hero-poster.jpg",
]);
run([
  "-i",
  "public/videos/hero-workshop-loop.mp4",
  "-vf",
  "fps=1/3.2,scale=480:-1,tile=3x2",
  "-frames:v",
  "1",
  dir + "/montage.jpg",
]);
console.log(
  "Final bytes: " + fs.statSync("public/videos/hero-workshop-loop.mp4").size,
);
