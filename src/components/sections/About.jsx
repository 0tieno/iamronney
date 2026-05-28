import { about } from '../../data/content'

export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="animate-fade-slide-up max-w-[580px]"
    >
      <p className="text-[0.87rem] text-stone-400 italic mb-2">{about.kicker}</p>

      <h2
        id="about-heading"
        className="text-[2.5rem] font-semibold leading-none tracking-tight text-stone-900 mb-8"
      >
        <span className="rhythm-heading underline decoration-brand-green decoration-[3px] underline-offset-[7px]">About</span>
      </h2>

      <p className="text-[0.9rem] text-stone-800 leading-[1.85] mb-8">
        {about.paragraphs?.[0]}
      </p>

      <p className="text-[1.9rem] text-stone-900 mb-6 leading-none">
        <span className="line-through decoration-stone-700 decoration-[1px]">Not in the News</span>
      </p>

      <ul className="list-disc pl-6 space-y-2 text-[0.9rem] text-stone-900 leading-[1.65] mb-9">
        <li>
          I maintain{' '}
          <a href="https://securecloudx.xyz/" className="text-brand-blue hover:underline">
            securecloudX
          </a>{' '}
          - a free &amp; open source platform to learn Cloud Security Engineering &amp; Cloud
          Penetration Testing! I love Software, cloud, DevOps and there matter security.
        </li>
        <li>2021-2025: Served the highest position of privilege on earth.</li>
      </ul>

      <h3 className="rhythm-subheading text-[2rem] font-medium text-stone-900 mb-4">2025</h3>
      <ul className="list-disc pl-6 space-y-1.5 text-[0.9rem] text-stone-900 leading-[1.65] mb-9">
        <li>Dec 1st: Awarded global technical expertise by Microsoft</li>
        <li>Oct 31: Backend intern at Safaricom PLC</li>
        <li>Oct 9: [At 22] graduated undergrad.</li>
        <li>
          Sept: [bounced]{' '}
          <a href="https://expertsliveke.lukekibiku.com/" className="text-brand-blue hover:underline">
            Experts Live Kenya
          </a>{' '}
          Speaker
        </li>
        <li>Aug: [awarded Distinction] Cloud &amp; Network Security</li>
        <li>
          July: Started building professional software for{' '}
          <a href="https://vergeadvisorypartners.co.ke/" className="text-brand-blue hover:underline">
            .ke
          </a>
        </li>
        <li>April: Sat for my last undergrad exam</li>
        <li>April: [awarded "A"] Defended my final year project</li>
        <li>April 8: Open source creator</li>
      </ul>

      <h3 className="rhythm-subheading text-[2rem] font-medium text-stone-900 mb-4">2024</h3>
      <ul className="list-disc pl-6 space-y-1.5 text-[0.9rem] text-stone-900 leading-[1.65] mb-9">
        <li>
          November 31: [As a Team] received recognition award by Microsoft ADC as the{' '}
          <a href="#" className="text-brand-blue hover:underline">
            Most Vibrant chapter in Kenya
          </a>
        </li>
      </ul>

      <h3 className="rhythm-subheading text-[2rem] font-medium text-stone-900 mb-4">2023</h3>
      <ul className="list-disc pl-6 space-y-1.5 text-[0.9rem] text-stone-900 leading-[1.65]">
        <li>
          November 31: Joined Global tech program -{' '}
          <a href="https://mvp.microsoft.com/en-US/studentambassadors/profile/b9a24a24-7cfe-489e-8a76-4a0ad03a3444" className="text-brand-blue hover:underline">
            Microsoft
          </a>
        </li>
      </ul>
    </section>
  )
}
