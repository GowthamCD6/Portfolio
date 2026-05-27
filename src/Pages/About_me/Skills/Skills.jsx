import React, { useContext, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Codicon from '../../../utils/Codicon';
import { WorkspaceContext } from '../../../components/Workspace/WorkspaceContext';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'Frontend Engineering',
    icon: 'fileCode',
    tech: 'React, Next.js, Tailwind, GSAP',
    summary:
      'Building high-performance interfaces with smooth interactions, scalable architecture, and production-grade UI systems.',
    proficiency: 94,
    level: 'Expert',
    meta: 'Used in 10+ production apps',
    tags: ['React', 'Animations', 'Responsive UI'],
    color: 'var(--accent)',
  },
  {
    name: 'Backend Systems',
    icon: 'terminal',
    tech: 'Node.js, Express, REST APIs',
    summary:
      'Designing secure backend architectures, authentication systems, and scalable APIs for real-world applications.',
    proficiency: 88,
    level: 'Advanced',
    meta: 'Built 5+ full-stack systems',
    tags: ['Node.js', 'API', 'Authentication'],
    color: 'var(--accent-warm)',
  },
  {
    name: 'Database Architecture',
    icon: 'database',
    tech: 'PostgreSQL, MongoDB, Redis',
    summary:
      'Creating optimized database structures with strong relationships, indexing strategies, and scalable schema design.',
    proficiency: 90,
    level: 'Advanced',
    meta: 'Primary choice for all projects',
    tags: ['PostgreSQL', 'Schema Design', 'Optimization'],
    color: 'var(--accent-gold)',
  },
  {
    name: 'Mobile Development',
    icon: 'smartphone',
    tech: 'React Native, Expo',
    summary:
      'Developing cross-platform mobile apps with smooth UX, native integrations, and consistent performance.',
    proficiency: 82,
    level: 'Production Ready',
    meta: '3 apps launched to stores',
    tags: ['React Native', 'Expo', 'Android'],
    color: 'var(--accent)',
  },
  {
    name: 'UI Motion & Experience',
    icon: 'layers',
    tech: 'Figma, Framer Motion, GSAP',
    summary:
      'Crafting immersive digital experiences with modern layouts, micro-interactions, and cinematic motion design.',
    proficiency: 86,
    level: 'Specialized',
    meta: 'Core focus in recent projects',
    tags: ['Motion Design', 'UX', 'Micro Interactions'],
    color: 'var(--accent-warm)',
  },
  {
    name: 'Deployment & DevOps',
    icon: 'cloud',
    tech: 'Docker, VPS, CI/CD, Linux',
    summary:
      'Managing deployments, server environments, and automation workflows for stable and scalable production systems.',
    proficiency: 78,
    level: 'Production Ready',
    meta: 'Self-hosting all personal projects',
    tags: ['Docker', 'Linux', 'Deployment'],
    color: 'var(--accent-gold)',
  },
];

const Skills = () => {
  const rootRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const barFillRefs = useRef([]);
  const orbRef = useRef(null);
  const { scrollerRef, isReady } = useContext(WorkspaceContext);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const scroller = scrollerRef?.current;
    if (!root || !scroller || !isReady) return;

    let cleanupFns = [];
    const ctx = gsap.context(() => {
      const cleanups = [];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          scroller,
          start: 'top 82%',
        },
      });

      tl.fromTo(
        headerRef.current?.querySelector('.skills-kicker'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
        .fromTo(
          headerRef.current?.querySelector('.section-title'),
          { y: 34, opacity: 0, rotateX: 16, transformPerspective: 900 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.72, ease: 'power3.out' },
          '-=0.18'
        )
        .fromTo(
          headerRef.current?.querySelector('.section-subtitle'),
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.56, ease: 'power2.out' },
          '-=0.28'
        );

      cardsRef.current.forEach((card, index) => {
        const fill = barFillRefs.current[index];
        if (!card) return;

        const tags = card.querySelectorAll('.skill-tag');
        const icon = card.querySelector('.skill-icon-wrapper');

        gsap.fromTo(
          card,
          {
            y: 52,
            opacity: 0,
            scale: 0.97,
            rotateX: 12,
            filter: 'blur(6px)',
            transformPerspective: 1000,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: 'blur(0px)',
            duration: 0.86,
            delay: index * 0.09,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              scroller,
              start: 'top 88%',
            },
          }
        );

        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0.85, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              delay: 0.1 + index * 0.09,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: card,
                scroller,
                start: 'top 86%',
              },
            }
          );
        }

        if (fill) {
          gsap.fromTo(
            fill,
            { width: '0%' },
            {
              width: `${skills[index].proficiency}%`,
              duration: 1.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                scroller,
                start: 'top 82%',
              },
            }
          );
        }

        if (tags.length) {
          gsap.fromTo(
            tags,
            { y: 12, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              stagger: 0.05,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                scroller,
                start: 'top 80%',
              },
            }
          );
        }

        const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (supportsFinePointer) {
          const glow = card.querySelector('.card-gradient-bg');
          const tiltX = gsap.quickTo(card, 'rotateX', { duration: 0.28, ease: 'power3.out' });
          const tiltY = gsap.quickTo(card, 'rotateY', { duration: 0.28, ease: 'power3.out' });
          const glowX = glow
            ? gsap.quickTo(glow, 'xPercent', { duration: 0.32, ease: 'power3.out' })
            : null;
          const glowY = glow
            ? gsap.quickTo(glow, 'yPercent', { duration: 0.32, ease: 'power3.out' })
            : null;

          const onMove = (event) => {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width;
            const py = (event.clientY - rect.top) / rect.height;
            const rx = (0.5 - py) * 7;
            const ry = (px - 0.5) * 9;

            tiltX(rx);
            tiltY(ry);
            if (glowX && glowY) {
              glowX((px - 0.5) * 12);
              glowY((py - 0.5) * 12);
            }
          };

          const onLeave = () => {
            tiltX(0);
            tiltY(0);
            if (glowX && glowY) {
              glowX(0);
              glowY(0);
            }
          };

          card.addEventListener('mousemove', onMove);
          card.addEventListener('mouseleave', onLeave);

          cleanups.push(() => {
            card.removeEventListener('mousemove', onMove);
            card.removeEventListener('mouseleave', onLeave);
          });
        }
      });

      if (orbRef.current) {
        gsap.to(orbRef.current, {
          yPercent: -12,
          xPercent: 6,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      cleanupFns = cleanups;
    }, root);

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, [isReady, scrollerRef]);

  return (
    <section id="skills" className="skills section-padding" ref={rootRef}>
      <div className="skills-bg-orb" ref={orbRef} />

      <div className="section-header" ref={headerRef}>
        <p className="skills-kicker">What I Work With</p>
        <h2 className="section-title">
          Skills <span className="text-gradient">Stack</span>
        </h2>
        <p className="section-subtitle">
          Building scalable digital products with a focus on performance, smooth user experience, and
          real-world problem solving.
        </p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <article
            key={skill.name}
            className="skill-card glass"
            style={{ '--skill-color': skill.color }}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
          >
            <div className="card-gradient-bg" />

            <div className="skill-card-content">
              <div className="skill-icon-wrapper">
                <Codicon icon={skill.icon} size={34} />
              </div>

              <h3 className="skill-name">{skill.name}</h3>

              <div className="skill-proficiency">
                <div className="proficiency-bar">
                  <span
                    className="proficiency-fill"
                    ref={(el) => {
                      barFillRefs.current[index] = el;
                    }}
                  />
                </div>
                <span className="proficiency-text">{skill.level}</span>
              </div>

              <p className="skill-summary">{skill.summary}</p>
              <p className="skill-meta">{skill.meta}</p>

              <div className="skill-tags">
                {skill.tags.map((tag) => (
                  <span key={`${skill.name}-${tag}`} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="skills-footer">
        <p className="footer-text">
          Focused on building production-ready applications with clean architecture, strong
          performance, and modern user experiences.
        </p>
      </div>
    </section>
  );
};

export default Skills;