'use client';

import { useState } from 'react';
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Coffee, Sparkles, Star, ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  const handleReadMore = () => {
    setIsStoryExpanded(!isStoryExpanded);
  };

  const handleViewCalendar = () => {
    // Smooth scroll to workshops section
    document.getElementById('workshops')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToStory = () => {
    // Smooth scroll to story section
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight text-primary">
              A small place in a <br />
              <span className="text-brand-gold">small town </span>for beautiful people.
            </h1>
            <p className="text-xl text-secondary max-w-lg">
              Gândit să transformăm cafeaua în experiență și poveste. Un loc unde timpul stă în loc.
            </p>
            <div className="flex gap-4">
              <Button size="lg">Vezi Meniul</Button>
              <Button variant="ghost" size="lg" className="group" onClick={handleScrollToStory}>
                Povestea Noastră <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="relative h-[600px] w-full hidden md:block">
            {/* Hero Image */}
            <div className="absolute inset-0 rounded-tr-[80px] rounded-bl-[80px] overflow-hidden shadow-2xl">
              <Image
                src="/images/hero2.png"
                alt="Cozy coffee shop interior with warm lighting"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-cream/20 to-transparent" />
            </div>
            {/* Decor element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Coffee, title: "Cafea de Specialitate", desc: "Boabe selectate, proaspăt măcinate și servite cu grijă pentru calitate constantă." },
            { icon: Sparkles, title: "Atmosferă Cozy", desc: "Spațiu cald și primitor, perfect pentru o pauză relaxantă sau lucru în liniște." },
            { icon: Star, title: "Personal Pasionat", desc: "Bariști dedicați care îți oferă sfaturi personalizate pentru cafeaua perfectă." },
          ].map((item, i) => (
            <Card key={i} className="p-8 text-center flex flex-col items-center gap-4 border border-transparent hover:border-brand-soft/50 transition-colors" hoverEffect>
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold mb-2">
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold font-heading text-primary">{item.title}</h3>
              <p className="text-secondary">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* The Story */}
      <section className="bg-brand-soft py-24 my-12" id="story">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl rotate-[-2deg] relative">
              <Image
                src="/images/hero.png"
                alt="MAZI Coffee Story"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-sepia-0 mix-blend-overlay opacity-20 pointer-events-none"></div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold font-heading text-primary">Povestea noastră</h2>
            <div className="text-lg text-secondary space-y-4">
              <p>
                "Într-un oraș mic din inima Munților Carpați, am visat să aducem ceva special – primul și singurul coffee shop de specialitate din Comănești."
              </p>
              <p className="font-serif italic text-2xl text-primary/80 border-l-4 border-brand-gold pl-6 py-2">
                Un loc unde cafeaua de calitate își găsește casa și unde comunitatea noastră poate savura momente autentice.
              </p>
              <p>
                De la boabele selectate manual până la fiecare detaliu al spațiului nostru primitor, Mazi Coffee este mai mult decât o cafenea – este punctul de întâlnire al pasiunii pentru excelență și căldura comunității comanestene.
              </p>

              {isStoryExpanded && (
                <div className="space-y-4 pt-4 border-t border-brand-soft animate-slide-down overflow-hidden">
                  <h3 className="text-2xl font-bold font-heading text-primary">De unde am pornit</h3>
                  <p>
                    Povestea Mazi Coffee a început dintr-o pasiune simplă: cafeaua bună ar trebui să fie accesibilă tuturor, nu doar în marile orașe. În Comănești, vedeam oameni care iubeau cafeaua, dar nu aveau unde să descopere varietatea și calitatea pe care o merită.
                  </p>
                  <p>
                    Am investit luni întregi în cercetare – vizitând roasteri, discutând cu baristi experimentați și testând zeci de sortimente de boabe. Am vrut să aducem nu doar cafea, ci o experiență completă: de la aroma proaspătă a boabelor măcinate la loc, până la atmosfera care te face să vrei să rămâi.
                  </p>

                  <h3 className="text-2xl font-bold font-heading text-primary mt-6">Calitatea pe primul loc</h3>
                  <p>
                    Fiecare ceașcă servită la Mazi Coffee este rezultatul unei dedicații constante. Lucrăm doar cu roasteri de specialitate, alegem boabe din surse etice și verificăm calitatea fiecărei livrări. Echipamentul nostru este întreținut zilnic pentru a asigura același gust excepțional de fiecare dată.
                  </p>
                  <p>
                    Bariștii noștri nu doar prepară cafea – ei sunt pasionați educatori, gata să îți povestească despre originea fiecărui soi și să îți recomande exact ce se potrivește gustului tău.
                  </p>

                  <h3 className="text-2xl font-bold font-heading text-primary mt-6">Comunitatea noastră</h3>
                  <p>
                    Mazi Coffee s-a transformat rapid într-un loc de întâlnire pentru comunitate. De la studenți care învață pentru examene, la profesioniști care își fac treaba în liniște, la prieteni care se regăsesc în fața unei cești de cafea – fiecare poveste adaugă ceva special acestui spațiu.
                  </p>
                  <p>
                    Organizăm workshop-uri de latte art, degustări de cafea și events comunitare pentru că credem că o cafenea este mai mult decât un loc de servit băuturi – este inima unui cartier, locul unde se nasc prietenii și idei.
                  </p>

                  <h3 className="text-2xl font-bold font-heading text-primary mt-6">Viitorul</h3>
                  <p>
                    Visul nostru este să continuăm să creștem împreună cu comunitatea din Comănești. Vrem să aducem noi experiențe, să extindem gama de workshop-uri și să rămânem fideli valorilor care ne-au dus aici: calitate, autenticitate și căldură umană.
                  </p>
                  <p className="font-serif italic text-xl text-primary/80">
                    Mulțumim că faceți parte din povestea noastră. Fiecare vizită, fiecare zâmbet și fiecare recomandare ne motivează să fim mai buni în fiecare zi.
                  </p>
                </div>
              )}
            </div>
            <Button variant="outline" className="mt-4" onClick={handleReadMore}>Citește Totul</Button>
          </div>
        </div>
      </section >

      {/* Workshop Carousel Placeholder */}
      < section className="container mx-auto px-4" id="workshops" >
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-brand-gold font-bold uppercase tracking-wider text-sm">Evenimente</span>
            <h2 className="text-4xl font-bold font-heading text-primary mt-2">Workshop-uri</h2>
          </div>
          <Button variant="outline" onClick={handleViewCalendar}>Vezi Calendar</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} hoverEffect className="group cursor-pointer">
              <div className="aspect-video bg-stone-200 relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                  DEC 2026
                </div>
                <div className="w-full h-full flex items-center justify-center text-stone-400">Event Img</div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-brand-soft text-xs text-secondary font-medium">Creativ</span>
                </div>
                <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-brand-gold transition-colors">Latte Art pentru Începători</h3>
                <p className="text-sm text-secondary mb-4">Învață să desenezi inimi și frunze în cafeaua ta de dimineață.</p>
                <div className="flex items-center text-sm font-bold text-primary">
                  Rezervă un loc <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section >
    </div >
  );
}
