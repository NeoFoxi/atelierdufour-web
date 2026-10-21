---
name: Atelier Dufour
description: Website des Ateliers für integrales Gestalten, Ausdrucksmalen und Workshops in Biel/Bienne
colors:
  paper-warm: "color(display-p3 .941 .898 .867)"
  card: "#ffffff"
  ink: "#2e2a24"
  muted: "#7a6e64"
  walnut: "#5a3010"
  walnut-deep: "#43220a"
  indigo: "#2f3470"
  indigo-soft: "#5c638a"
  indigo-ink: "#2b2e44"
  charcoal: "#555555"
  charcoal-deep: "#333333"
  link-blue: "#0066cc"
typography:
  display:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 6vw, 4.2rem)"
    fontWeight: 700
    lineHeight: 1.05
  headline:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)"
    fontWeight: 700
    lineHeight: 1.15
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "0.82rem"
    fontWeight: 700
    letterSpacing: "0.18em"
    textTransform: "uppercase"
rounded:
  card: "22px"
  card-base: "18px"
  nav: "14px"
  button: "6px"
spacing:
  card: "26px"
  section: "56px 0"
  gap: "22px"
  container: "1100px"
components:
  button-primary:
    backgroundColor: "{colors.charcoal}"
    textColor: "#ffffff"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  button-primary-hover:
    backgroundColor: "{colors.charcoal-deep}"
  button-hero:
    backgroundColor: "rgba(255, 255, 255, 0.92)"
    textColor: "#111111"
    rounded: "{rounded.button}"
    padding: "12px 22px"
  card:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.card}"
    padding: "{spacing.card}"
---

# Design System: Atelier Dufour

## Overview

**Creative North Star: "Die Spielwiese"**

Die Website soll sich wie eine freundlich-spielerische Wiese anfühlen, auf der Kinder und Erwachsene gleichermassen willkommen sind: mehr Farbe, weichere Formen, und die Arbeit des Ateliers (Tonerde, Malerei) als grösste Farbflecken. Der aktuelle Bestand ist warm-erdig (Walnussbraun auf warmem Papier) mit einem coolen Blauviolett auf den Malen/Ton-Seiten; die Spielwiese-Richtung baut darauf auf, statt sie zu verdrängen. Fotografie ist das dominante Gestaltungsmittel: grosse, runde Bildflächen mit weichen Schatten. [Tiefe/Schattenphilosophie: vom Nutzer noch nicht festgelegt.]

**Key Characteristics:**
- Warmes Papier als Flächengrund, grosse abgerundete Karten und Bildflächen
- system-ui Typografie, kräftige Headlines, versal-gesetzte Eyebrows mit weiter Laufweite
- Abwechselnde Bild/Text-Sektionen (Zickzack), weiche grosse Schatten (Stand heute)
- Doppeltes Farbwelt-Muster: Walnuss (Startseite, warm) vs. Indigo (malen/ton, cool)

## Colors

Zwei Seitenwelten über dieselben Token-Rollen: warm-eerdig (Startseite, workshops) und kühl-blauviolett (malen, ton). Charcoal deckt Buttons und Navigation ab.

### Primary
- **Walnussbraun** (#5a3010): Eyebrows und Akzente der Startseite; **Walnuss dunkel** (#43220a) für H2.
- **Indigo** (#2f3470): Akzentfarbe der Malen/Ton-Seiten; **Indigo weich** (#5c638a) als gedämpfter Textton.

### Neutral
- **Warmes Papier** (color(display-p3 .941 .898 .867) ≈ #f0e5dd): Seitenhintergrund; Fallback rgb(240, 229, 221).
- **Weiss** (#ffffff): Kartenfläche.
- **Tinte** (#2e2a24): Haupttext (auf Malen/Ton: **Indigo-Tinte** #2b2e44).
- **Muted Braun** (#7a6e64): Sekundärtext.
- **Charcoal** (#555555 / #333333): Buttons, Navigation, Footer-Akzente.

### Accent
- **Link-Blau** (#0066cc): nur Kontakt-Links in Formularen.

## Typography

**Display/Body Font:** system-ui (Betriebssystem-Fontstack, keine Webfonts geladen)

**Character:** Nüchtern, gut lesbar, geräte-nah — die Persönlichkeit kommt aus Gewichtung, Versalsatz und Bildern, nicht aus der Schrift.

### Hierarchy
- **Display** (700, clamp(2.4rem, 6vw, 4.2rem), 1.05): Nur Hero.
- **Headline** (700, clamp(1.6rem, 3vw, 2.2rem), 1.15): Sektions-/Seitentitel H2.
- **Body** (400, 1.05rem, 1.65): Absätze.
- **Eyebrow/Label** (700, 0.8–0.82rem, letter-spacing 0.14–0.18em, Uppercase): Kicker über Titeln.

## Layout

Zentrierte Spalte mit max. 1100–1120px, 20–24px Rand. Startseite: Hero-Karte (86vh, Radius 22px) über Zickzack-Sektionen (2-Spalten-Grid, clamp(24px, 5vw, 64px) Abstand, ab 860px einspaltig). Sektionstrennung über feine Linie in Akzentfarbe (14% Deckung) statt Boxen. Navigation und Footer als gerundete Module über der Seitenbreite.

## Elevation & Depth

Stand heute: weiche, grosse Schatten (`0 18px 50px rgba(30, 20, 10, .14)` auf Karten/Hero, `0 4px 12px rgba(0,0,0,.1)` im Base-Modul) plus Hero-Overlay (linear-gradient, rgba(20,20,26,.78→.3)) und backdrop-blur auf Hero-Karten. [Nicht als verbindliche Philosophie festgelegt.]

## Shapes

Runde Sprache durchgehend: Karten 18–22px Radius, Navigation 14px, Buttons 6px. Keine Rahmen um Karten; Trennung über Schatten und Linien.

## Components

### Buttons
- **Shape:** leicht gerundet (6px), bold, 1.1em.
- **Primary:** Charcoal #555 auf Weiss-Text, padding 12px 22px; hover #333.
- **Hero-Variante:** fast weiss (rgba(255,255,255,.92)) auf dunklem Bild, hover voll weiss.
- **Fenster-Karten-Button:** volle Kartenbreite, gleiche Farben.

### Cards
- **Corner Style:** 18–22px Radius.
- **Background:** Weiss auf warmem Papier.
- **Shadow Strategy:** weiche grosse Schatten (siehe Elevation).
- **Internal Padding:** 26px.

### Navigation
- Dunkle Leiste (#333), Radius 14px, weisser Text; ab 860px horizontale Leiste mit Hover-Dropdowns, darunter kompakter Balken mit Burger und Fullscreen-Overlay. `.nav-brand` leicht gesperrt.

### Footer
- Feine Trennlinie in 28%-Akzentfarbe, mehrspaltig flex-wrap, Gedächtnisfarbe var(--muted).

## Do's and Don'ts

### Do:
- **Do** neue Flächen auf dem warmen Papier (#f0e5dd) oder in Kartenweiss anlegen.
- **Do** Eyebrows als versal-gesetzte Labels mit 0.14em+ Laufweite einsetzen.
- **Do** Bilder gross, quadratisch-ish (4/3) und mit Kartenradius zeigen.
- **Do** die Seitenwelten respektieren: Walnuss auf Startseite/workshops, Indigo auf malen/ton.

### Don't:
- **Don't** Webfonts laden — der Fontstack ist bewusst system-ui.
- **Don't** harte 0px-Ecken oder scharfe Trennrahmen einführen.
- **Don't** die zwei Akzentwelten (Walnuss/Indigo) auf einer Seite mischen.
- **Don't** Tracking, Cookies oder Webfont-Abrufe ergänzen (datenschutzrechtlich festgeschrieben).
