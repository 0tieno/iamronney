// ─── Profile / left-panel ────────────────────────────────────────────────────
export const profile = {
    name: 'i am ronney otieno.',
    taglines: [
        'hacker(offensive & defensive security and ctf player) | swe ++founder -- open source creator | speaker - writer - poet | dreamer - thinker - doer -lover of God.',
        'hire or refer me for cyber security, backend software engineering or DevSecOps roles. thank you!',
    ],
    email: 'ronney.onyango.otieno@gmail.com',
    socials: [
        { label: 'GitHub', href: 'https://github.com/iamronney', external: true },
        { label: 'LinkedIn', href: '#', external: true },
        { label: 'Twitter / X', href: '#', external: true },
    ],
    footer: {
        text: 'built with care',
        repo: { label: 'github.repo', href: 'https://github.com/iamronney/iamronney' },
    },
}

// ─── Navigation ──────────────────────────────────────────────────────────────
export const navItems = [
    { id: 'work', label: 'My Work' },
    { id: 'about', label: 'About' },
    { id: 'conferences', label: 'Conferences, Presentations & Publications' },
    { id: 'achievements', label: 'Achievements, Honors & Awards' },
    { id: 'posts', label: 'Posts' },
]

// ─── Posts ───────────────────────────────────────────────────────────────────
export const posts = [
    {
        slug: 'on-being-23',
        title: 'On Being 23 (And Everyone Thinking I am 33)',
        date: 'May 27, 2026',
        tag: 'Essay',
        excerpt:
            'I am turning 23 next week. But most people think I am in my thirties. I have made peace with the gap between how I am perceived and how I actually am.',
        body: [
            'Next Tuesday I turn 23. I mention this not to celebrate, but because it shocks people every time. They assume I am older. Sometimes much older. People in meetings talk to me as if I have been working in tech for decades. Colleagues assume I have finished university and chosen not to pursue further education. Interviewers are surprised when they realise I am still in my early twenties.',
            'I do not look particularly old. I do not sound particularly old. But something about how I carry myself, how I talk about work, how I engage with problems — something signals to people that I have lived more life than I actually have.',
            'The disconnect fascinates and unsettles me in equal measure. Because from the inside, I do not feel old. I feel like I am still figuring things out. I have been working in tech for a few years now but that is nothing. I have made mistakes that felt catastrophic at the time. I have written code I now cringe at. I have misunderstood fundamentals that I have only recently started to really grasp. I do not feel like I have arrived anywhere.',
            'But people treat you differently when they think you have already arrived. They ask for your opinion on architecture decisions as if you have years of war stories. They assume you have mentored people. They assume you have led teams. They assume the confidence you project comes from experience when sometimes it just comes from not knowing enough to be afraid.',
            'I grew up in Kenya, fetching water in those red plastic containers — kibuyus — carrying them on my head back from the borehole to school in the afternoon. I remember the weight of them. I remember the other kids doing the same thing, our shoulders all slightly bent the same way from the load. I remember thinking about what I wanted to be when I was older. I do not remember thinking "I will be very accomplished by 22." I did not think about accomplishment at all. I thought about not dropping the kibuyu.',
            'That boy carrying water is still me. Somewhere in the middle of all the GitHub commits and security audits and conference talks, that is still who I am. Younger. More uncertain. Still learning.',
            'The weird part is that people do not want to believe this. When I tell them I am 23, they do a calculation in their head, they smile politely, and they do not really update their model of who I am. They want me to be older because older fits better with their narrative of who I should be.',
            'I used to try to correct that narrative. I would mention my age preemptively. "I know I am young, but..." I do not do that anymore. If people want to think I have more experience than I do, that is not my problem to fix. But I also refuse to accept the premise that I should feel old. I should not. I am not.',
            'What I have learned is that some things come from age and some things come from attention. I have paid attention. That is not the same as being experienced. I have cared about getting things right. That is not the same as having gotten everything right. I have shown up. That is not the same as having stayed long enough to earn the right to speak with authority.',
            'So next Tuesday when I turn 23, I will be aware of the gap. People will hear my age and be surprised. They will do that thing where they search for the moment they misjudged me, the comment that was too familiar or too confident for someone so young. But I will also be very clear about this: I am just getting started. The water is still dripping down my spine from the kibuyu. I am still learning how to carry the weight without bending so far forward that I trip.',
            'That is not something to correct. That is something to be honest about.',
        ],
    },
    {
        slug: 'why-i-chose-security',
        title: 'Why I Chose Security: The Honest Answer I Give in Interviews',
        date: 'May 27, 2026',
        tag: 'Career',
        excerpt:
            'Security chose me as much as I chose it. But the real reason is darker and more interesting than "I wanted to protect people."',
        body: [
            'Every interview I have had in the last few years includes some version of this question: "Why security?" The sanitised version of my answer is "I wanted to make systems safer for everyone." That is true. But it is incomplete.',
            'The real answer is that I was fascinated by the idea of breaking things. Not in a destructive way — in a way that teaches you how things actually work. You cannot understand a system until you have tried to compromise it. You cannot design a secure API until you have thought like an attacker. Security is systems thinking with an adversarial lens, and that is the most interesting way to think about systems.',
            'I got into CTFs because they gave me permission to be wrong in a controlled environment. Every failed exploit attempt teaches you something. Every time you do not get the flag, you are learning a new attack vector, a new tool, a new way of thinking. That immediate feedback loop is addictive once you experience it. And unlike real hacking, there are no legal consequences.',
            'But there is something else. I realised that security is where the real power is. Not in the sense of fame or status, but in the sense of understanding. A backend engineer might build a feature. A security engineer understands why that feature is dangerous if built wrong. That knowledge is leverage. Once you see vulnerabilities, you cannot unsee them. And once you start looking for them, you realise they are everywhere.',
            'The other part I do not always say in interviews is that security appeals to my contrarian nature. Everyone says they want to protect people. Fewer people actually want to think like an attacker. Fewer still are willing to tell you the uncomfortable truth about your security posture instead of just passing a compliance checklist. I am in that smaller group. I like that group.',
            'When I evaluate a new role, I ask: will this role let me go deep on security? Will I be able to influence architecture decisions? Will I get to work on systems complex enough to be interesting? If the answer is yes, I am interested. If the answer is "we need someone for compliance," I move on.',
            'Security is not a career path for people who want certainty. You are always learning. The threat landscape changes constantly. Tools become obsolete. Techniques that worked six months ago do not work anymore. That kind of constant flux would drive some people crazy. It energises me.',
            'So when someone asks me "Why security?" in an interview, I say: because I want to understand systems deeply enough to break them intelligently. Because I want to be useful by telling people uncomfortable truths. Because the learning never stops. And because once you see how fragile everything is, you cannot look away.',
        ],
    },
    {
        slug: 'why-i-chose-backend',
        title: 'Why I Chose Backend Engineering: Building the Systems That Matter',
        date: 'May 26, 2026',
        tag: 'Career',
        excerpt:
            'Backend engineering is where the real complexity lives. It is also where most companies actually fail.',
        body: [
            'I get asked this less often than "why security" but it comes up: why backend and not frontend? The answer is that backend engineering is where the trust live. That is what attackers want',
            'When you are working on the frontend, you are working for a user who sees your work immediately. There is feedback. There is a visual representation of success or failure. It is satisfying work. But the user cannot tell if your backend is well-designed. They cannot tell if your database queries are optimised. They cannot tell if your caching strategy is sound. They will only know when the system slows down or breaks.',
            'That invisibility is precisely why I found it interesting. Backend engineering is about building systems that are correct, fast, reliable, and maintainable — often under constraints you did not choose. It is about understanding trade-offs at a fundamental level. You cannot build a good backend without understanding networking, databases, operating systems, distributed systems. You have to know all of it.',
            'I got into backend work because I wanted to understand how systems actually work at scale. Not theoretically. Practically. I wanted to know why a database index matters. Why connection pooling prevents your service from collapsing under load. Why certain architectural patterns fail in production. Those are not academic questions — they are questions that determine whether a system serves millions of users or fails at thousands.',
            'There is also something satisfying about building infrastructure that is boring in the best way. A well-designed backend service is one that runs without drama. Logs are clean. Alerts do not wake you up at 2am. Performance is predictable. When something breaks, the diagnostics are obvious. Most of the time you build systems that fail in mysterious ways because nobody invested in the boring parts — monitoring, logging, error handling, graceful degradation.',
            'The intersection of backend engineering and security is where I spend most of my energy. Because a backend engineer who does not think about security is a time bomb. You need to understand how to authenticate users, how to authorise requests, how to handle sensitive data, how to design APIs that do not leak information. Those are backend problems first.',
            'When I evaluate a backend role, I look for a few things: are the data models well-thought-out? Is the system observable? Do they have good testing practices? Do people understand the trade-offs they have made? If yes, it is worth doing. If no, I am not interested in debugging their mistakes.',
            'Backend engineering is the foundation of everything. It is not glamorous. But it matters. And that is why I chose it.',
        ],
    },
    {
        slug: 'why-i-got-into-it',
        title: 'Why I Got Into IT: The Question I Answer Differently Every Time',
        date: 'May 25, 2026',
        tag: 'Career',
        excerpt:
            'IT was not my plan. But somewhere along the way it became my life. Here is why.',
        body: [
            'Every interview includes this question now: "So, why did you get into IT?" And I have learned that there is no single answer. The answer depends on who is asking, what they want to hear, and what part of the truth I want to emphasise that day.',
            'The straightforward answer is curiosity. Computers are interesting puzzles. How do they work? What can you make them do? How do you break them? If you have that kind of mind, IT is inevitable. You will find your way into it.',
            'But the deeper answer is that IT gave me agency. Growing up, the world felt like it had rules I did not make and could not question. IT was different. It had rules, yes, but they were rules you could understand, test, and bend. You could break something and learn why it broke. You could build something and see it work. That sense of control was intoxicating.',
            'I started with just curiosity — wanting to understand Linux, then networking, then web applications. Each answer led to more questions. Each skill opened doors to new problems. And somewhere along that path, I realised I was not just learning IT, I was learning how the world actually works. Because the world runs on code now.',
            'The other reason I got into IT, and the one I do not always say, is that it is a meritocracy in a way few other fields are. Your background matters less than what you can do. Your skin colour does not matter. Your accent does not matter. Whether you went to a fancy university does not matter. What matters is: can you solve the problem? Can you write good code? Can you debug a system under pressure?',
            'I have seen people rise in IT from nothing because they were good. I have seen people from privilege fail because they were not. That is rare. I liked that. I still like that.',
            'The practical answer is that IT pays well and offers good opportunities. But if I am being honest, I would probably be in IT for less money because the work itself is interesting. The money is a bonus. Because I am a strong believer that value preceeds reward. A chapter I have written in my book - "Be Useful" ',
            'What keeps me in IT now is different from why I got into it. I got in because of curiosity. I stay because I want to be useful. I want to build systems that matter. I want to understand things deeply. I want to work with people who are as interested in these questions as I am.',
            'When someone asks me now "Why IT?" I say: because I want to understand how systems work, and I want to build things that are useful. Because I like working on hard problems with smart people. Because after years of doing this, I cannot imagine doing anything else. And because every day I learn something that makes me realise how much I still do not know.',
            'That last part is the real answer.',
        ],
    },
    {
        slug: 'competing-interests',
        title: 'Too Many Things, Unapologetically: On Being Both the Engineer and the Hacker',
        date: 'May 27, 2026',
        tag: 'Essay',
        excerpt:
            'Backend SWE. Security engineer. Cloud. APIs. CTF player. Speaker. The world wants you to pick one. I refuse.',
        body: [
            'People keep asking me what I do. Not in the small-talk sense — in the "pick a lane" sense. Are you a software engineer or a security person? Are you backend or cloud? Are you a builder or a breaker? The question annoys me every time because it assumes that the interesting version of a career is a straight line, and I have never believed that.',
            'I want to be nerdy about backend engineering. I mean properly nerdy — the kind of person who reads RFC documents for fun, who has opinions about connection pooling and database indexing and why your service mesh is lying to you about latency. I want to understand distributed systems well enough that when something breaks at 2am I am the one people call, not because I am on-call but because I actually know what is happening.',
            'And I want to be nerdy about security. Not in the compliance checkbox sense. In the "I understand what an attacker is thinking" sense. Web APIs are one of my favourite places to think about this because they sit at the intersection of everything — authentication, authorisation, input handling, data exposure, trust boundaries between services. A well-designed API is a security statement. A poorly designed one is an invitation. I want to be fluent in both the design and the attack.',
            'Cloud adds another layer. Infrastructure is no longer something that lives in a data centre someone else manages. It is code. It is configuration. It is IAM policies and network rules and service accounts with permissions that nobody has audited in three years. The engineer who understands cloud and the security person who understands cloud are looking at the same thing from different angles, and I want both angles. That is what DevSecOps actually means when it is not just a word on a job description.',
            'The tension is real though. There are only so many hours. Going deep on Kubernetes internals is time I am not spending on malware analysis. Time I spend on API design is time I am not spending on CTF challenges. I feel this tension constantly and I have stopped pretending it is not there.',
            'What I have made peace with is that the tension is a feature. The backend engineer makes me a better security person because I understand what the developer was thinking when they wrote the vulnerable code — which means I write better reports and more actionable remediations. The security person makes me a better backend engineer because I ask uncomfortable questions about trust assumptions during code review, not just performance ones. The two feed each other in ways that would not happen if I had picked one.',
            'The "go-to guy" thing is related to this. I do not want to be the person you call for one specific narrow thing. I want to be the person you call when the situation is complicated and you are not sure which kind of expertise it actually needs. That requires breadth. It also requires depth, because breadth without depth is just trivia. So I am chasing both, simultaneously, without apology.',
            'Unapologetic is the word I keep coming back to. Not arrogant — I am wrong often and I say so. But unapologetic about the scope of what I want to know and do. The world has enough specialists who cannot talk to each other. I want to be the translation layer. I want to be the person who walks into a room full of engineers and security people and cloud architects and understands what all of them are actually saying.',
            'That is the career I am building. It is messier than a straight line. It is also more interesting.',
        ],
    },
    {
        slug: 'breaking-into-security',
        title: 'Breaking into Security: A Hacker\'s Honest Retrospective',
        date: 'Apr 12, 2026',
        tag: 'Security',
        excerpt:
            'What nobody tells you about starting in offensive security — the mindset shifts, the rabbit holes, and why the fundamentals still win.',
        body: [
            'Everyone who gets into security has a story. Mine started with curiosity and a lot of broken things I had no business poking at. Not systems I owned. Systems I simply found interesting. I want to be honest about that because the sanitised version — "I was always passionate about protecting people" — is true but incomplete.',
            'The first thing nobody tells you is that offensive security is mostly about patience and documentation, not genius. The glamorous image — the dark hoodie, the green terminal, the single keystroke that brings down a server — is a lie the movies told you. Real hacking is reading source code for three hours looking for a logic flaw. It is writing a report nobody wants to read but everybody needs. It is re-running a scan because your first result looked too clean.',
            'The second thing is that the fundamentals do not go stale. Networking. Operating systems. How HTTP actually works under the hood. How memory is laid out. I have watched people chase the latest CVE or the newest attack framework while still not knowing what a TCP handshake looks like. Those people plateau early. The ones who go deep on the boring stuff keep climbing.',
            'The mindset shift that mattered most for me was moving from "I want to find vulnerabilities" to "I want to understand systems so well that the vulnerabilities become obvious." That sounds like a small reframe but it changes everything about how you approach a target, a codebase, an architecture review.',
            'CTFs helped me get there faster than anything else. Not because the challenges mirror real work — they often do not — but because they forced me to be wrong quickly and learn from it. In a CTF you get immediate feedback. You either get the flag or you do not. That tight loop builds instincts that take years to develop otherwise.',
            'If I were starting over today I would spend the first six months doing nothing but networking fundamentals, Linux internals, and web application basics. I would not touch a fancy tool until I could explain what it was doing at the packet level. That foundation is what lets you adapt when the tool fails, the environment is unusual, or the target does something unexpected.',
            'Security is a long game. The people who stay in it are the ones who find the learning itself rewarding, not just the outcome. I am still very much at the beginning of that game. But I know now that the fundamentals always win.',
        ],
    },
    {
        slug: 'nixos-reproducible-security-tooling',
        title: 'NixOS and Reproducible Environments for Security Tooling',
        date: 'Mar 3, 2026',
        tag: 'DevSecOps',
        excerpt:
            'How I used Nix derivations during my Outreachy internship to package security tooling with deterministic builds and zero dependency drift.',
        body: [
            'One of the strangest problems in security tooling is that the tools themselves are often a liability. You download a scanner, it pulls in six transitive dependencies pinned to ancient versions, and suddenly your "security environment" is a collection of known vulnerabilities held together by hope and a legacy Python runtime. I spent a good part of my Outreachy internship with the NixOS team thinking about this problem.',
            'Nix solves dependency management differently from every package manager you have used before. Instead of mutating a shared global state, every package lives in its own content-addressed path in the Nix store. Two versions of the same tool can coexist without conflict. Rollbacks are trivial. Reproducibility is guaranteed by the hash of the build inputs, not by a lockfile that can drift.',
            'For security tooling specifically, this matters for two reasons. First, auditability: when you can describe the exact build graph of your tool as a declarative expression, you can audit it. You can diff it. You can see exactly what changed between versions. Second, portability: a Nix derivation that works on my machine works on your machine and works in CI because it is describing a build, not depending on ambient state.',
            'The work I did involved packaging several tools from the NGI (Next Generation Internet) ecosystem so they could be distributed through nixpkgs. Writing a derivation for a Go binary is straightforward once you understand the pattern. Writing one for a tool with complex native dependencies, or one that downloads things at build time (a Nix anti-pattern), is where you start learning what Nix is actually doing.',
            'The lesson I kept coming back to was that reproducibility is a form of honesty. A tool that builds differently on different machines is a tool that is lying to you about what it is. Nix forces you to be explicit about every input, which is uncomfortable at first and then deeply clarifying.',
            'I came into this internship as a security engineer who used Linux. I left it thinking differently about what it means to trust software. That is the kind of internship worth doing.',
        ],
    },
    {
        slug: 'mobile-threat-modelling',
        title: 'Mobile Threat Modelling: Notes from the Lab',
        date: 'Jan 18, 2026',
        tag: 'Mobile Security',
        excerpt:
            'A practical look at threat modelling Android applications — attack surfaces, common misconfigurations, and what a good test report looks like.',
        body: [
            'Mobile security has a reputation for being a niche. People assume it is the same as web security with a smaller screen. It is not. The attack surface is different, the trust boundaries are different, and the toolchain is different. After the Mobile Hacking Lab fellowship I have a much more grounded view of what actually goes wrong in Android applications.',
            'Threat modelling is where most mobile assessments should start but rarely do. Before you open Burp or run apktool, you should be asking: what does this application do? What data does it handle? Where does that data go? Who are the realistic attackers? A banking app has a different threat profile than a fitness tracker, and your assessment should reflect that.',
            'The attack surface of an Android application has several layers. The APK itself: exported activities, content providers, broadcast receivers that can be called by other applications without permission. The network layer: certificate pinning bypasses, cleartext traffic, API endpoints that assume the client is trusted. The data layer: insecure storage in SharedPreferences, world-readable files, sensitive data in logs. The most interesting vulnerabilities I found during the fellowship were almost always at the intersection of two of these layers.',
            'Common misconfigurations that keep appearing: exported components with no permission check, deeplinks that accept arbitrary input without validation, API tokens hardcoded in the build config, WebViews with JavaScript enabled and no allowlist on the schemes they handle. None of these are novel. They appear in OWASP Mobile Top 10. They still ship in production applications in 2026.',
            'A good report does three things. It describes the vulnerability clearly enough that a developer who did not write the code can understand it. It explains the actual impact — not "this could allow an attacker to..." but what an attacker with this capability could realistically do to a real user. And it gives a remediation that is specific enough to implement, not generic advice to "validate all inputs."',
            'The hardest part of mobile security is not finding the vulnerabilities. It is communicating them in a way that results in them being fixed. That is a writing and empathy problem as much as a technical one.',
        ],
    },
    {
        slug: 'on-usefulness',
        title: 'On Usefulness: Why I Write, Build, and Keep Showing Up',
        date: 'Nov 29, 2025',
        tag: 'Essay',
        excerpt:
            'A personal essay on the idea that drives most of what I do: wanting to be genuinely useful — to people, to systems, to the craft.',
        body: [
            'I keep a note on my phone with one word: useful. Not successful. Not famous. Not even good. Useful.',
            'There is a version of ambition that is entirely self-directed — about recognition, about titles, about being seen. I understand that version. I have felt it. But somewhere along the way I started asking a different question: not "what do I want to achieve?" but "what would actually matter to someone?"',
            'That shift changed how I write. I used to write to prove I understood something. Now I write because someone else might need to understand it, and I have already done the hard part of figuring it out. The essay you are reading right now is an example of that. I am not certain it is brilliant. I am trying to make it useful.',
            'The same logic applies to building. I have started projects nobody used and shipped features nobody needed. The difference between those and the ones that worked was not cleverness. It was whether I had listened carefully enough to understand what the actual problem was. Most of the time the problem is not the one being described. Useful builders learn to hear the real question underneath the stated one.',
            'Showing up is the third part. Writing and building are things you can do in bursts. Showing up is a practice. It means being in the room when it is not glamorous. It means reviewing someone else\'s pull request before pushing your own. It means mentoring a junior even when you are busy. It means teaching what you know before you feel fully qualified to teach it.',
            'I am writing a book. I do not know if it will be published or read widely. What I know is that the act of writing it is making me more useful — sharper in my thinking, more honest about what I do not know, more intentional about what I am trying to say. That is enough to keep going.',
            'Usefulness is not a lesser ambition than greatness. It is a more honest one. It asks you to stay tethered to other people, to real problems, to things that actually need doing. And it turns out that the people who end up mattering most — the ones you remember, the ones who shaped you — were almost always trying to be useful, not impressive.',
            'That is what I am after. Not always successfully. But consistently.',
        ],
    },
    {
        slug: 'open-source-career-strategy',
        title: 'Open Source as a Career Strategy (Not Just Charity)',
        date: 'Oct 5, 2025',
        tag: 'Open Source',
        excerpt:
            'Contributing to open source changed how I think about visibility, ownership, and building trust with an audience I haven\'t met yet.',
        body: [
            'When I started contributing to open source I told myself I was doing it for the community. That was partly true. But if I am honest, I also wanted people to see my work. There is nothing wrong with that. The interesting thing is that the best way to be seen in open source is to genuinely try to be useful, which means the self-interested version and the altruistic version converge.',
            'Most career advice about open source focuses on contributions to large projects — getting a PR merged into a well-known repository. That is valuable. But there is another path that I think gets underrated: building your own things in the open and maintaining them with the same discipline you would apply to work you are paid for.',
            'SecureCloudX started as a place to put security tooling I was building for myself. Documentation written to the standard of something I would want to find when I was stuck. READMEs that explain the why, not just the how. Issues triaged and responded to. That discipline, even for a project with a small audience, builds something that a list of merged PRs does not: a record of how you think, how you communicate, and how you handle the unglamorous parts of software.',
            'The visibility that comes from open source is slow and asymmetric. You will have months with no stars, no issues, no sign that anyone is paying attention. Then someone will find exactly the tool they needed, share it, and you will get a week of attention that converts into nothing concrete. And then you will have months of silence again. The people who succeed at open source as a career strategy are the ones who find intrinsic value in the work and treat the external validation as a bonus, not the point.',
            'What open source actually gave me was better than visibility. It gave me a way to learn in public without the stakes of a production system. It gave me collaborators I would never have met otherwise. It gave me a portfolio that demonstrates not just what I built but how I operate over time. An employer can look at a repository and see how I handle a difficult bug report, how I write a commit message, whether I follow through on things I said I would do.',
            'If you are thinking about open source as a career strategy: start something small that solves a problem you have. Maintain it properly. Write as if someone who trusts you will read it. Do not worry about the stars. The compound interest on that kind of work is slow but it is real.',
        ],
    },
]

// ─── Work ────────────────────────────────────────────────────────────────────
export const work = {
    primary: [
        { role: 'Platform Engineer', company: 'Savannah Informatics Limited', period: 'Nov, 2025 – Present' },
        { role: 'Program Associate', company: 'KamiLimu', period: 'Feb, 2024 – Present' },
        { role: 'Outreachy Intern', company: 'NixOs – Nix@NGI Team', period: 'May – September, 2025' },
        { role: 'Program Associate', company: 'Positive Sum Africa', period: 'Oct, 2024 – Apr, 2025' },
        { role: 'Mobile Security Fellowship', company: 'Mobile Hacking Lab', period: 'Jul – Nov, 2024' },
    ],
    secondary: [
        {
            role: 'Security Analyst',
            company: 'Global TTC',
            period: 'May – Aug, 2023',
            contributions: [
                'Performed security assessments and documented actionable findings for web systems.',
                'Supported incident response workflows and hardening recommendations.',
            ],
        },
        {
            role: 'Backend SWE',
            company: 'Safaricom PLC',
            period: "2022 – '23",
            contributions: [
                'Built backend service features and API integrations for internal platforms.',
                'Improved reliability through testing, monitoring, and iterative optimization.',
            ],
        },
        {
            role: 'Software Engineer',
            company: 'Verge Advisory Partners',
            period: "2022 – '23",
            contributions: [
                'Delivered software components aligned to business and advisory use cases.',
                'Collaborated across product and engineering to ship maintainable features.',
            ],
        },
        {
            role: 'Security Advisor',
            company: 'Microsoft',
            period: "2022 – '23",
            contributions: [
                'Delivered software components aligned to business and advisory use cases.',
                'Collaborated across product and engineering to ship maintainable features.',
            ],
        },
        {
            role: 'Open Source Creator',
            company: 'secureCloudX',
            period: "2022 – '23",
            contributions: [
                'Designed and published open-source security tooling and project documentation.',
                'Maintained community-facing improvements through issues and pull requests.',
            ],
        },
        {
            role: 'Project & SWE Tech Lead',
            company: 'KYUSDA',
            period: '2022 – Present',
            contributions: [
                'Led technical execution, mentoring contributors and coordinating delivery timelines.',
                'Shaped architecture and implementation decisions for core engineering initiatives.',
            ],
        },
    ],
}

// ─── About ───────────────────────────────────────────────────────────────────
export const about = {
    kicker: 'and yeah, this is all about me. :)',
    paragraphs: [
        "I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the sea shore, and diverting myself in now and then finding a smooother pebble or a prettier shell than ordinary, whilist the greater ocean of truth lay all undiscovered before me.",
    ],
    highlight: "I just want to be useful! I'm even writing a book about it",
}