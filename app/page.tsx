"use client";

import React, { useEffect, useMemo, useState } from "react";

import "../styles/gallery.css";

type ImageItem = {
  src: string;
  title: string;
  date: string;
  link?: string;
};

type YearData = Record<string, ImageItem[]>;

const YEAR_DATA: YearData = {
  "2025-2026": [
    { src: "/images/2025/1.jpg", title: "Trajectory Talks", date: "10-10-2-25", link: "https://share.google/jsE1mw0x5aNlI9J9K" },
    { src: "/images/2025/2.jpg", title: "UI/UX Seminar", date: "17-10-2025", link: "https://example.com/2025-26/wild-nature" },
    { src: "/images/2025/3.jpg", title: "The Weekend", date: "31-10-2025", link: "https://example.com/2025-26/city-mood" },
   // { src: "/images/2025/4.jpg", title: "Transylvanian Escape", date: "31-10-2025", link: "https://example.com/2025-26/ocean-breeze" },
    { src: "/images/2025/5.jpg", title: "Transylvanian Escape", date: "31-10-2025", link: "https://example.com/2025-26/sunset-glow" },
    { src: "/images/2025/7.jpg", title: "Pixel Paranoia", date: "01-11-2025", link: "https://example.com/2025-26/green-escape" },
  ],

  "2024-2025": [
    { src: "/images/2024/codesashtra.jpg", title: "Codeshastra", date: "05-04-2024", link: "https://example.com/2024-25/golden-hour" },
    { src: "/images/2024/codesashtra2.jpg", title: "Codeshastra", date: "06-04-2024", link: "https://example.com/2024-25/blue-mountains" },
    { src: "/images/2024/codesashtra3.jpg", title: "Codeshastra", date: "06-04-2024", link: "https://example.com/2024-25/street-scene" },
    { src: "/images/2024/midweek.jpg", title: "Midweek Ventures", date: "22-10-2024", link: "https://example.com/2024-25/calm-lake" },
    { src: "/images/2024/midweek2.jpg", title: "Midweek Ventures", date: "22-10-2024", link: "https://example.com/2024-25/forest-walk" },
    { src: "/images/2024/midweek3.jpg", title: "Midweek Ventures", date: "23-10-2024", link: "https://example.com/2024-25/skyline" },
    { src: "/images/2024/pixel.jpg", title: "Pxel Paranoia", date: "23-10-2024", link: "https://example.com/2024-25/skyline" },
    { src: "/images/2024/trajectory.jpg", title: "Trajectory Talks", date: "01-10-2024", link: "https://example.com/2024-25/skyline" },
    { src: "/images/2024/sansmaran.jpg", title: "Sansmaran", date: " ", link: "https://example.com/2024-25/skyline" },
    //{ src: "/images/2024/1.jpg", title: "Core-Codeshastra", date: "06-04-2024", link: "https://share.google/jsE1mw0x5aNlI9J9K" },
    //{ src: "/images/2024/3.jpg", title: "Committee-Codeshastra", date: "06-04-2024", link: "https://share.google/jsE1mw0x5aNlI9J9K" },
    
  ],

  "2023-2024": [
    { src: "https://picsum.photos/id/120/1400/2000", title: "Scene 1", date: "2023-06-01", link: "https://example.com/2023-24/scene-1" },
    { src: "https://picsum.photos/id/121/1400/2000", title: "Scene 2", date: "2023-06-18", link: "https://example.com/2023-24/scene-2" },
    { src: "https://picsum.photos/id/122/1400/2000", title: "Scene 3", date: "2023-07-04", link: "https://example.com/2023-24/scene-3" },
    { src: "https://picsum.photos/id/123/1400/2000", title: "Scene 4", date: "2023-08-10", link: "https://example.com/2023-24/scene-4" },
    { src: "https://picsum.photos/id/124/1400/2000", title: "Scene 5", date: "2023-09-22", link: "https://example.com/2023-24/scene-5" },
    { src: "https://picsum.photos/id/125/1400/2000", title: "Scene 6", date: "2023-11-05", link: "https://example.com/2023-24/scene-6" },
  ],

  "2022-2023": [
    { src: "https://picsum.photos/id/130/1400/2000", title: "Set A", date: "2022-05-14", link: "https://example.com/2022-23/set-a" },
    { src: "https://picsum.photos/id/131/1400/2000", title: "Set B", date: "2022-06-09", link: "https://example.com/2022-23/set-b" },
    { src: "https://picsum.photos/id/132/1400/2000", title: "Set C", date: "2022-07-21", link: "https://example.com/2022-23/set-c" },
    { src: "https://picsum.photos/id/133/1400/2000", title: "Set D", date: "2022-08-03", link: "https://example.com/2022-23/set-d" },
    { src: "https://picsum.photos/id/134/1400/2000", title: "Set E", date: "2022-10-15", link: "https://example.com/2022-23/set-e" },
    { src: "https://picsum.photos/id/135/1400/2000", title: "Set F", date: "2022-12-02", link: "https://example.com/2022-23/set-f" },
  ],

  "2021-2022": [
    { src: "https://picsum.photos/id/140/1400/2000", title: "Year 21", date: "2021-04-12", link: "https://example.com/2021-22/year-21-1" },
    { src: "https://picsum.photos/id/141/1400/2000", title: "Year 21", date: "2021-05-08", link: "https://example.com/2021-22/year-21-2" },
    { src: "https://picsum.photos/id/142/1400/2000", title: "Year 21", date: "2021-06-19", link: "https://example.com/2021-22/year-21-3" },
    { src: "https://picsum.photos/id/143/1400/2000", title: "Year 21", date: "2021-07-25", link: "https://example.com/2021-22/year-21-4" },
    { src: "https://picsum.photos/id/144/1400/2000", title: "Year 21", date: "2021-09-02", link: "https://example.com/2021-22/year-21-5" },
    { src: "https://picsum.photos/id/145/1400/2000", title: "Year 21", date: "2021-10-17", link: "https://example.com/2021-22/year-21-6" },
  ],

 
  "2020-2021": [
    { src: "https://picsum.photos/id/150/1400/2000", title: "Year 20", date: "2020-04-12", link: "https://example.com/2020-21/year-20-1" },
    { src: "https://picsum.photos/id/151/1400/2000", title: "Year 20", date: "2020-05-08", link: "https://example.com/2020-21/year-20-2" },
    { src: "https://picsum.photos/id/152/1400/2000", title: "Year 20", date: "2020-06-19", link: "https://example.com/2020-21/year-20-3" },
    { src: "https://picsum.photos/id/153/1400/2000", title: "Year 20", date: "2020-07-25", link: "https://example.com/2020-21/year-20-4" },
    { src: "https://picsum.photos/id/154/1400/2000", title: "Year 20", date: "2020-09-02", link: "https://example.com/2020-21/year-20-5" },
    { src: "https://picsum.photos/id/155/1400/2000", title: "Year 20", date: "2020-10-17", link: "https://example.com/2020-21/year-20-6" },
  ],

  "2019-2020": [
    { src: "https://picsum.photos/id/160/1400/2000", title: "Year 19", date: "2019-04-12", link: "https://example.com/2019-20/year-19-1" },
    { src: "https://picsum.photos/id/161/1400/2000", title: "Year 19", date: "2019-05-08", link: "https://example.com/2019-20/year-19-2" },
    { src: "https://picsum.photos/id/162/1400/2000", title: "Year 19", date: "2019-06-19", link: "https://example.com/2019-20/year-19-3" },
    { src: "https://picsum.photos/id/163/1400/2000", title: "Year 19", date: "2019-07-25", link: "https://example.com/2019-20/year-19-4" },
    { src: "https://picsum.photos/id/164/1400/2000", title: "Year 19", date: "2019-09-02", link: "https://example.com/2019-20/year-19-5" },
    { src: "https://picsum.photos/id/165/1400/2000", title: "Year 19", date: "2019-10-17", link: "https://example.com/2019-20/year-19-6" },
  ],
};

export default function Page() {
 
  const years = useMemo(() => Object.keys(YEAR_DATA), []);
  const [activeYear, setActiveYear] = useState<string>(years[0]);
  const images = YEAR_DATA[activeYear];

  const [paused, setPaused] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [switching, setSwitching] = useState<boolean>(false);

  const active = images?.[activeIndex];

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };
  const closeLightbox = () => setOpen(false);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, images.length]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const onYearChange = (y: string) => {
    if (y === activeYear) return;
    setPaused(true);
    setSwitching(true);

    window.setTimeout(() => {
      setActiveYear(y);
      setActiveIndex(0);
      setSwitching(false);
      setPaused(false);
    }, 280);
  };

  const downloadName =
    active?.title ? active.title.replace(/\s+/g, "-").toLowerCase() + ".jpg" : `image-${activeIndex + 1}.jpg`;

  return (
    <div className="page">
      <div className="topNav">
        <div className="navInner">
          <div className="brand">Gallery</div>

          <div className="yearSelectWrap">
            <label className="yearLabel" htmlFor="yearSelect">
              Year
            </label>
            <select
              id="yearSelect"
              className="yearSelect"
              value={activeYear}
              onChange={(e) => onYearChange(e.target.value)}
              aria-label="Select year"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="centerStage">
        <div
          className={`carousel ${paused ? "paused" : ""} ${switching ? "switching" : ""}`}
          style={{ ["--ringY" as any]: "clamp(40px, 18vw, 350px)" }}
        >
          <div className="carousel-rotation-direction">
            <ul className="carousel-item-wrapper" style={{ ["--_num-elements" as any]: images.length }}>
              {images.map((img, i) => (
                <li
                  key={img.src + i}
                  className="carousel-item"
                  style={{ ["--_index" as any]: i + 1 }}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onClick={() => openLightbox(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openLightbox(i);
                  }}
                >
                  <div className="flip">
                    <div className="face front">
                      <img src={img.src} alt={img.title || `Image ${i + 1}`} />
                    </div>

                    <div className="face back">
                      <img className="backImg" src={img.src} alt="" aria-hidden="true" />
                      <div className="backOverlay">
                        <div className="dateTag">{img.date}</div>
                        <h3>{img.title}</h3>
                        <div className="hint">Click to open</div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}

              <li className="carousel-ground" />
            </ul>
          </div>
        </div>
      </div>

      {open && active && (
        <div
          className="lightboxOverlay"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className="lightbox" onClick={(e) => e.stopPropagation()}>
            <img className="lightboxImg" src={active.src} alt={active.title} />

            <button className="navBtn left" onClick={prev} type="button" aria-label="Previous">
              <ChevronLeft />
            </button>
            <button className="navBtn right" onClick={next} type="button" aria-label="Next">
              <ChevronRight />
            </button>

            <div className="lightboxTopLeft" onClick={(e) => e.stopPropagation()}>
              <div className="lightboxDate" aria-label="Image date">
                {active.date}
              </div>
            </div>

            <div className="lightboxTopRight" onClick={(e) => e.stopPropagation()}>
              <a
                className="iconBtn"
                href={active.src}
                download={downloadName}
                target="_blank"
                rel="noreferrer"
                aria-label="Download image"
                title="Download"
              >
                <DownloadIcon />
              </a>

              <button
                className="iconBtn"
                onClick={closeLightbox}
                type="button"
                aria-label="Close lightbox"
                title="Close"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="lightboxCaption">
              <h3>{active.title}</h3>

              {active.link && (
                <a className="readMoreBtn" href={active.link} target="_blank" rel="noreferrer">
                  Read more
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v10" />
      <path d="M7 11l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
function ChevronLeft() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}
function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
