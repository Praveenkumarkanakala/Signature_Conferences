import Euroimage from "./images/euroevent.jpeg"
import Euroimage1 from "./images/euroevent1.jpeg"
import Euroimage2 from "./images/euroevent2.jpeg"
import Euroimage3 from "./images/euroevent3.jpeg"
import Euroimage4 from "./images/euroevent4.jpeg"
import Euroimage5 from "./images/euroevent5.jpeg"
import Euroimage6 from "./images/euroevent6.jpeg"
import Euroimage7 from "./images/euroevent7.jpeg"

import usaimage from "./images/usaevents.jpeg";
import usaimage1 from "./images/usaevents2.jpeg";
import usaimage2 from "./images/usaevents1.jpeg";
import usaimage3 from "./images/usaevents4.jpeg";
import usaimage4 from "./images/usaevents3.jpeg";
import usaimage5 from "./images/usaevents5.jpeg";

import northamericaimg from "./images/naevent.jpeg";
import northamericaimg1 from "./images/naevent1.jpeg";
import northamericaimg2 from "./images/naevent2.jpeg";
import northamericaimg3 from "./images/naevent3.jpeg";
import northamericaimg4 from "./images/naevent4.jpeg";
import northamericaimg5 from "./images/naevent5.jpeg";
import northamericaimg6 from "./images/naevent6.jpeg";
import northamericaimg7 from "./images/naevent7.jpeg";




import Asiaimg from "./images/asiaevent.jpeg";
import Asiaimg1 from "./images/asiaevent1.jpeg";
import Asiaimg2 from "./images/asiaevent2.jpeg";
import Asiaimg3 from "./images/asiaevent3.jpeg";
import Asiaimg4 from "./images/asiaevent4.jpeg";
import Asiaimg5 from "./images/asiaevent5.jpeg";
import Asiaimg6 from "./images/asiaevent6.jpeg";
import Asiaimg7 from "./images/asiaevent7.jpeg";




export const regionFilters = [
  { id: "all", label: "All Regions" },
  { id: "usa", label: "USA" },
  { id: "asia", label: "Asia" },
  { id: "europe", label: "Europe" },
  { id: "north-america", label: "North America" },
];

export const categoryFilters = [
  { id: "all", label: "All Conferences" },
  { id: "women-leadership", label: "Women Leadership" },
  { id: "wellness", label: "Wellness" },
  { id: "business", label: "Business" },
  { id: "ai-stem", label: "AI & STEM" },
];

// ─────────────────────────────────────────────────────────────
//  REGION: USA
//  Auckland, New Zealand · Tokyo, Japan · Melbourne, Australia
// ─────────────────────────────────────────────────────────────

const usaConferences = [
  {
    id: "usa-01",
    title: "US Global Women SHINE Congress",
    date: "March 08-09, 2027",
    location: "New York, USA",
    city: "New York",
    country: "USA",
    region: "usa",
    image: usaimage,
    description:
      "Step into a transformative experience at the US Global Women SHINE Congress, where visionary women leaders, entrepreneurs, professionals, and change-makers unite to redefine leadership in today’s dynamic world. This summit is a powerful platform designed to foster meaningful connections, amplify voices, and cultivate leadership excellence through insightful discussions, innovative strategies, and shared experiences.\n\nJoin us as we create a space for empowerment, collaboration, and growth—where ideas turn into action and ambition transforms into achievement. Mark your calendars and be part of this inspiring journey. Together, let’s shape a future where women lead with confidence, purpose, and lasting impact across industries and communities worldwide.",
    themes: [
      "Purpose-Driven Women Leadership",
      "Influential Leadership & Executive Presence",
      "Emotional Intelligence for Women Leaders",
      "Confidence Building & Overcoming Self-Doubt",
      "Strategic Decision-Making in Leadership",
      "Women in Innovation & Entrepreneurship",
      "Leading with Vision & Impact",
      "Communication & Storytelling for Leaders",
      "Building High-Performance Teams",
      "Inclusive Leadership & Diversity",
      "Negotiation Skills for Women Leaders",
      "Leadership in the Digital Era",
      "Mentorship & Sponsorship for Women",
      "Career Advancement & Leadership Pathways",
      "Work-Life Integration & Sustainable Success",
      "Resilience & Adaptability in Leadership",
      "Networking & Personal Branding for Women",
      "Women Leading Organizational Change",
      "Ethical Leadership & Governance",
      "Future of Women Leadership & Global Influence",
    ],
    fullDescription:
      "Theme: “Empowering Women to SHINE Globally”",
  },
  {
    id: "usa-02",
    title: "US Global MINDS EXCEL Congress",
    date: "March 08-09, 2027",
    location: "New York, USA",
    city: "New York",
    country: "USA",
    region: "usa",
    image: usaimage1,
    description:
      " Step into a powerful experience at the US Global MINDS EXCEL Congress, where dynamic women leaders, innovators, and changemakers unite to inspire transformation and drive meaningful impact. This summit creates a vibrant platform for sharing ideas, building connections, and unlocking leadership potential in an ever-evolving world.\n\nThrough inspiring keynotes, interactive sessions, and collaborative discussions, participants will gain actionable strategies to lead with confidence, purpose, and vision. Join us as we celebrate women’s achievements, foster global collaboration, and empower the next generation of leaders to create lasting change.",
    themes: [
      "Global Leadership in a Changing World",
      "From Vision to Execution: Turning Ideas into Impact",
      "Strategic Thinking for Sustainable Success",
      "Digital Transformation and Global Opportunities",
      "Entrepreneurship Without Borders",
      "Emotional Intelligence for Leaders",
      "Confidence, Clarity, and Communication",
      "Overcoming Barriers to Excellence",
      "Productivity and Peak Performance Strategies",
      "Building a Global Brand and Influence",
      "Scaling Your Business Internationally",
      "The Power of Networking and Strategic Partnerships",
      "Marketing and Visibility in the Digital Age",
      "Purpose-Driven Leadership for Global Impact",
      "Creating a Legacy of Excellence",
      "Thriving in a Global Environment",
      "Resilience for Future Leaders",
      "Visionary Thinking for Growth",
      "Leading with Confidence and Impact",
      "Innovation and Strategic Growth",
    ],
    fullDescription:
      "Theme: Empowering Global Minds to Excel in Leadership",
  },
  {
    id: "usa-03",
    title: "US Global SHE LEADS Forum",
    date: "July 22-23, 2027",
    location: "Los Angeles, USA",
    city: "Los Angeles",
    country: "USA",
    region: "usa",
    image: usaimage2,
    description:
      "Join us at the US Global SHE LEADS Forum, a dynamic platform designed to inspire and empower emerging leaders, innovators, and entrepreneurs from around the world. This summit brings together industry experts, successful founders, and forward-thinking professionals to share insights, experiences, and strategies for navigating the evolving global landscape.\n\nThrough engaging keynote sessions, panel discussions, and networking opportunities, participants will gain practical knowledge, leadership skills, and entrepreneurial mindset needed to turn ideas into impactful ventures. Be part of this transformative journey as we shape the leaders of tomorrow and drive innovation for a better future.",
    themes: [
  "Visionary Leadership for Women",
  "Empowerment Through Purpose-Driven Leadership",
  "Transformational Leadership & Influence",
  "Building Confidence & Executive Presence",
  "Emotional Intelligence in Women Leadership",
  "Strategic Thinking & Decision-Making",
  "Women in Entrepreneurship & Innovation",
  "Leadership for Global Impact",
  "Communication & Public Speaking for Leaders",
  "Inclusive Leadership & Diversity",
  "Negotiation & Leadership Effectiveness",
  "Personal Branding & Thought Leadership",
  "Career Growth & Leadership Advancement",
  "Resilience & Adaptability in Leadership",
  "Mentorship, Coaching & Women Empowerment",
  "Work-Life Integration & Sustainable Leadership",
  "Women Leading Change & Transformation",
  "Ethical Leadership & Governance",
  "Collaboration & Strategic Partnerships",
  "Future of Women Leadership & Global Success",
],
    fullDescription:
      "Theme: SHE Leads: Empowering Global Women in Leadership",
  },
  {
    id: "usa-04",
    title: "US Global WELLNESS Conclave",
    date: "July 08–09, 2026",
    location: "Los Angeles, USA",
    city: "Los Angeles",
    country: "USA",
    region: "usa",
    image: usaimage3,
    description:
      "Join us at the US Global WELLNESS Conclave,, a global platform that brings together experts, professionals, and thought leaders to explore innovative approaches to mental wellness. This conference fosters meaningful conversations around emotional resilience, stress management, and holistic wellbeing, empowering individuals and communities to navigate today’s fast-changing world with strength and clarity.\n\nThrough engaging keynote sessions and collaborative discussions, participants will gain valuable insights into emerging trends, practical strategies, and inclusive care models. Be part of this transformative experience as we work together to break barriers, inspire positive change, and promote a healthier, more balanced future for all.",
      themes: [
  "Emotional Wellbeing & Mental Health Foundations",
  "Building Psychological Resilience in Daily Life",
  "Emotional Intelligence & Self-Awareness",
  "Stress Management & Burnout Prevention",
  "Coping Strategies for Anxiety & Emotional Challenges",
  "Mindfulness for Emotional Balance",
  "Positive Psychology & Mental Strength",
  "Cognitive Approaches to Emotional Regulation",
  "Trauma-Informed Emotional Healing",
  "Self-Compassion & Inner Stability",
  "Work-Life Balance & Sustainable Wellbeing",
  "Neuroscience of Emotions & Resilience",
  "Building Healthy Thought Patterns",
  "Emotional Agility in Personal & Professional Life",
  "Strength-Based Mental Health Approaches",
  "Wellbeing Practices for Long-Term Resilience",
  "Managing Change, Uncertainty & Pressure",
  "Coaching & Emotional Wellness Strategies",
  "Social Support & Relationship Wellbeing",
  "Future of Emotional Wellbeing & Resilient Living",
],
    fullDescription:
      "Theme: Shaping the Future of Holistic Wellness",
  },
  {
    id: "usa-05",
    title: "US Global PowHER Congress",
    date: "November 08-09, 2027",
    location: "San Francisco, USA",
    city: "San Francisco",
    country: "USA",
    region: "usa",
    image: usaimage4,
    description:
      "Embark on an inspiring journey at the US Global PowHER Congress, a dynamic platform that brings together visionary leaders, professionals, and changemakers to champion women’s empowerment and leadership. This congress fosters meaningful conversations around confidence, career growth, entrepreneurship, and personal development—empowering women to rise, lead, and thrive in today’s evolving world.\n\n Join us for this impactful experience and become part of a global movement advancing women’s leadership and empowerment. Together, let’s shape a future where confident, purpose-driven women lead with influence, innovation to create lasting success for individuals and organizations.",
themes: [
  "Women Impact Leadership & Global Influence",
  "Empowerment Through Purpose-Driven Leadership",
  "Transformational Leadership & Change-Making",
  "Emotional Intelligence for Women Leaders",
  "Building Confidence & Executive Presence",
  "Strategic Thinking & Visionary Leadership",
  "Women in Innovation & Social Impact",
  "Communication & Influence Skills",
  "Leadership for Sustainable Development",
  "Inclusive Leadership & Gender Equity",
  "Personal Branding & Thought Leadership",
  "Mentorship, Coaching & Empowerment Networks",
  "Career Growth & Leadership Advancement",
  "Resilience & Overcoming Leadership Challenges",
  "Decision-Making & Problem-Solving in Leadership",
  "Collaboration & Strategic Partnerships",
  "Women Leading Organizational Transformation",
  "Ethical Leadership & Integrity",
  "Networking for Global Impact",
  "Future of Women Leadership & Transformative Change",
],
    fullDescription:
      "Theme: Unleashing PowHER for Global Impact",
  },
  {
    id: "usa-06",
    title: "US Global Women WISE Summit",
    date: "November 08-09, 2027",
    location: "San Francisco, USA",
    city: "San Francisco",
    country: "USA",
    region: "usa",
    image: usaimage5,
    description:
      "Embark on an inspiring journey at the US Global Women WISE Summit, where visionary leaders, professionals, and change-makers come together to explore the evolving landscape of leadership and holistic workplace wellness. This summit serves as a dynamic platform to foster meaningful conversations, share innovative strategies, and empower women to lead with confidence, resilience, and purpose while prioritizing mental, emotional, and professional wellbeing.\n\nJoin us for this impactful experience and be part of a global movement driving inclusive leadership and healthier work environments. Together, let’s shape a future where empowered women leaders go hand in hand to create sustainable success for individuals and organizations.",
 themes: [
  "Women’s Leadership & Organisational Growth",
  "Workplace Wellbeing & Employee Mental Health",
  "Emotional Intelligence in Leadership",
  "Building Inclusive & Equitable Workplaces",
  "Psychological Safety in Teams",
  "Resilient Leadership in Changing Work Environments",
  "Stress Management & Burnout Prevention",
  "Work-Life Integration for Women Leaders",
  "Breaking Barriers: Gender Equality in Leadership",
  "Confidence Building & Executive Presence",
  "Mentorship, Sponsorship & Leadership Development",
  "Diversity, Equity & Inclusion (DEI) Strategies",
  "Conflict Management & Communication Skills",
  "Leadership in Hybrid & Remote Workplaces",
  "Organizational Culture & Employee Engagement",
  "Coaching for Women Leaders",
  "Decision-Making Under Pressure",
  "Career Advancement & Leadership Pathways",
  "Self-Care as a Leadership Strategy",
  "Future of Work & Women in Leadership",
],
    fullDescription:
      "Theme: Women WISE: Elevating Leadership and Global Influence",
  },
];

// ─────────────────────────────────────────────────────────────
//  REGION: EUROPE
//  Berlin, Germany · Rome, Italy · Paris, France · London, UK
// ─────────────────────────────────────────────────────────────

const europeConferences = [
  {
    id: "eu-01",
    title: "Euro WomenRise Congress",
    date: "March 4–6, 2027",
    location: "Paris, France ",
    city: "Paris",
    country: "France",
    region: "europe",
    image: Euroimage,
    description:
      "The Euro WomenRise Congress in Paris is a powerful gathering of women leaders, innovators, and changemakers who are shaping the future across industries and borders. Focused on leadership, innovation, and global influence, this congress creates a dynamic space for sharing transformative ideas, building meaningful connections, and amplifying voices that inspire change.\n\nSet in one of the world’s most iconic cities, the event empowers participants to rise with confidence, expand their global presence, and contribute to a new era of impactful leadership.",
    themes: [
  "Women Rising: The New Era of Global Leadership",
  "From Potential to Power: Accelerating Women’s Leadership Growth",
  "Innovation Leadership: Women Driving the Future Economy",
  "Building Global Influence in a Connected World",
  "Strategic Leadership for High-Impact Growth",
  "Personal Branding for Global Visibility and Authority",
  "Leadership Communication that Inspires Action",
  "Women in Decision-Making Roles: Shaping Policy and Business",
  "Entrepreneurship and Leadership: Scaling with Purpose",
  "Navigating Challenges and Breaking Leadership Barriers",
  "Building Collaborative Leadership Ecosystems",
  "Leadership Agility in a Rapidly Changing World",
  "Driving Innovation Through Diverse Leadership",
  "Creating Opportunities Through Global Networks",
  "Empowering the Next Generation of Women Leaders",
],
    fullDescription:
      "Theme: Women Rising: Driving Leadership, Innovation, and Global Influence ",
  },
  {
    id: "eu-02",
    title: "Euro HerPower Summit",
    date: "March 4–6, 2027",
    location: "Paris, France ",
    city: "Paris",
    country: "France",
    region: "europe",
    image: Euroimage1,
    description:
      "The Euro HerPower Summit is designed to unlock the inner strength, confidence, and influence of women leaders ready to make a lasting impact. This summit focuses on personal empowerment, leadership presence, and the ability to lead with clarity and purpose in a global landscape.\n\nThrough inspiring sessions, powerful conversations, and collaborative engagement, participants will gain the tools and mindset needed to elevate their leadership journey and create meaningful impact in their communities and beyond.",
    themes: [
  "Unlocking Inner Confidence for Leadership Excellence",
  "The Power of Self-Belief in Leadership Success",
  "Emotional Intelligence as a Leadership Superpower",
  "Overcoming Self-Doubt and Imposter Syndrome",
  "Leading with Authenticity and Personal Strength",
  "Building a Strong Leadership Presence",
  "Confidence in Communication and Public Speaking",
  "The Mindset of High-Impact Women Leaders",
  "Harnessing Inner Strength for External Success",
  "Developing Resilience in Leadership Journeys",
  "The Psychology of Influence and Authority",
  "Empowerment Through Purpose-Driven Leadership",
  "Aligning Vision, Values, and Leadership Goals",
  "Creating Impact Through Personal Transformation",
  "Owning Your Voice on Global Platforms",
],
    fullDescription:
      "Theme: Unleashing HER Power: Leading with Confidence, Influence, and Impact",
  },
  {
    id: "eu-03",
    title: "Euro MindExcel Congress",
    date: "June 3–5, 2027",
    location: "London, UK ",
    city: "London",
    country: "UK",
    region: "europe",
   image: Euroimage2,
    description:
      "The Euro MindExcel Congress in London brings together forward-thinking leaders, professionals, and innovators to explore the power of mindset, intelligence, and strategic leadership. This congress focuses on cultivating excellence in thinking, decision-making, and innovation to drive impactful outcomes in today’s fast-evolving world.\n\nParticipants will engage in insightful discussions, gain new perspectives, and develop the clarity and confidence needed to lead with intelligence and purpose on a global stage.",
    themes: [
  "The Science of High-Performance Leadership Thinking",
  "Strategic Decision-Making for Global Leaders",
  "Cognitive Excellence in Business and Innovation",
  "Leadership Intelligence in the Digital Era",
  "Critical Thinking for Complex Problem Solving",
  "Innovation Mindsets for Future Leaders",
  "Neuroscience of Leadership and Performance",
  "Mental Agility in High-Stakes Environments",
  "Data-Driven Leadership and Smart Decisions",
  "Building Resilient and Adaptive Mindsets",
  "Focus, Discipline, and Productivity Mastery",
  "Leadership in an AI-Driven World",
  "Creative Thinking for Business Innovation",
  "Enhancing Leadership Through Continuous Learning",
  "Expanding Possibilities Through Strategic Thinking",
],
    fullDescription:
      "Theme: Excellence in Mind and Leadership: Driving Innovation, Intelligence, and Impact",
  },
  {
    id: "eu-04",
    title: "Euro WomenSphere Congress",
    date: "June 3–5, 2027",
    location: "London, UK",
    city: "London",
    country: "UK",
    region: "europe",
    image: Euroimage3,
    description:
      "The Euro WomenSphere Congress is a global platform for women who are actively shaping leadership across industries and communities. This congress emphasizes collaboration, innovation, and influence, bringing together diverse voices to create a shared vision for the future of leadership.\n\nWith a focus on global impact, participants will have the opportunity to connect, collaborate, and contribute to a growing network of women leaders driving meaningful change worldwide.",
    themes: [
  "Women Leading Global Change and Transformation",
  "Building Influence Across Borders and Cultures",
  "The Future of Women in Global Leadership",
  "Cross-Cultural Leadership and Collaboration",
  "Networking Strategies for Global Impact",
  "Women in Policy, Innovation, and Business Leadership",
  "Collective Leadership for Global Challenges",
  "Expanding Leadership Through Strategic Alliances",
  "Women Driving Sustainable Growth and Impact",
  "Leadership Beyond Boundaries: A Global Perspective",
  "The Power of International Women Networks",
  "Creating Opportunities Through Global Collaboration",
  "Women as Architects of Future Leadership",
  "Leadership in a Diverse and Inclusive World",
  "Strengthening Global Leadership Presence",
],
    fullDescription:
      "Theme: Women Shaping the Global Leadership Sphere: Driving Innovation, Influence, and Impact",
  },
  {
    id: "eu-05",
    title: "Euro WellAura Leadership Summit",
    date: "September 9–11, 2027",
    location: "Berlin, Germany ",
    city: "Berlin",
    country: "Germany",
    region: "europe",
    image: Euroimage4,
    description:
      "The Euro WellAura Leadership Summit in Berlin redefines leadership by integrating wellness, balance, and mindful influence into the leadership journey. This summit focuses on the connection between personal well-being and professional excellence, empowering leaders to perform at their highest potential while maintaining inner balance.\n\nParticipants will explore strategies for sustainable leadership, resilience, and energy alignment, enabling them to lead with clarity, purpose, and long-term impact.",
themes: [
  "The Role of Wellness in Leadership Excellence",
  "Energy Management for High-Performance Leaders",
  "Mindful Leadership in High-Pressure Environments",
  "Preventing Burnout and Sustaining Leadership Success",
  "Emotional Balance in Decision-Making",
  "The Science of Well-being and Productivity",
  "Building Resilience Through Mindfulness Practices",
  "Leadership with Inner Alignment and Clarity",
  "Creating Sustainable Success Through Wellness",
  "Stress Management for Leaders in Fast-Paced Industries",
  "The Connection Between Mental Health and Leadership",
  "Holistic Leadership for Long-Term Impact",
  "Work-Life Integration for Modern Leaders",
  "The Future of Conscious and Mindful Leadership",
  "Leading with Energy, Balance, and Purpose",
],
    fullDescription:
      "Theme: Elevating Leadership Through Wellness: Harnessing Inner Energy, Balance, and Mindful Influence",
  },
  {
    id: "eu-06",
    title: "Euro Femina Leadership Summit",
    date: "September 9–11, 2027",
    location: "Berlin, Germany ",
    city: "Berlin",
    country: "Germany",
    region: "europe",
    image: Euroimage5,
    description:
      "The Euro Femina Leadership Summit is a celebration of bold leadership and the transformative power of women shaping the future. This summit highlights the strength, resilience, and influence of women leaders who are driving change across industries and societies.\n\nThrough inspiring insights and meaningful engagement, participants will be empowered to lead with confidence, amplify their voice, and create lasting impact in a rapidly evolving global landscape.",
themes: [
  "Women Leading the Future of Global Leadership",
  "Bold Leadership in a Competitive World",
  "Amplifying Women’s Voices Across Industries",
  "Building Strength Through Leadership Challenges",
  "Women as Drivers of Innovation and Growth",
  "Leadership Through Courage and Confidence",
  "Breaking Barriers and Redefining Leadership Roles",
  "Creating Impact Through Strong Leadership Presence",
  "Women as Change-Makers in Modern Society",
  "Leadership Development for Emerging Women Leaders",
  "The Role of Women in Transformational Leadership",
  "Empowering Women to Lead with Authority",
  "Women in Executive and Decision-Making Roles",
  "Creating a Culture of Women Leadership Excellence",
  "Leading with Strength, Vision, and Influence",
],
    fullDescription:
      "Theme: She Leads the Future: Bold Voices, Strong Leadership, Lasting Impact",
  },
  {
    id: "eu-07",
    title: "Euro Eminence Women Leadership Summit",
    date: "December 02–04, 2027",
    location: "Rome, Italy ",
    city: "Rome",
    country: "Italy",
    region: "europe",
    image: Euroimage6,
    description:
      "The Euro Eminence Women Leadership Summit in Rome is a prestigious platform dedicated to excellence, influence, and global leadership. Inspired by the legacy and timeless significance of the city, this summit focuses on empowering women to step into positions of influence and lead with confidence and authority.\n\nParticipants will engage in impactful discussions, share visionary ideas, and build connections that support long-term growth and global recognition.",
themes: [
  "The Journey to Leadership Eminence",
  "Building Authority and Global Influence",
  "Excellence as a Leadership Standard",
  "Strategic Leadership for High-Level Impact",
  "The Art of Executive Presence and Influence",
  "Leadership Excellence in Decision-Making",
  "Creating a Legacy Through Leadership",
  "Developing Elite Leadership Capabilities",
  "Leadership with Vision, Integrity, and Purpose",
  "Navigating Complex Leadership Challenges",
  "High-Level Communication for Leaders",
  "Leading Organizations Toward Excellence",
  "Global Leadership Standards and Practices",
  "Sustaining Excellence in Leadership Roles",
  "Inspiring Leadership Through Vision and Values",
],
    fullDescription:
      "Theme: Leading with Excellence: Empowering Women to Rise as Influential Global Leaders",
  },
  {
    id: "eu-08",
    title: "Euro InnerPower Leadership Summit",
    date: "December 02–04, 2027",
    location: "Rome, Italy ",
    city: "Rome",
    country: "Italy",
    region: "europe",
    image: Euroimage7,
    description:
      "The Euro InnerPower Leadership Summit is designed for leaders seeking to unlock their full potential by leading from within. This summit emphasizes self-awareness, clarity, and transformational growth as the foundation for impactful leadership.\n\nThrough deep insights and empowering experiences, participants will discover how to harness their inner strength, overcome limitations, and lead with authenticity, purpose, and confidence.",
themes: [
  "Unlocking Inner Leadership Potential",
  "The Power of Self-Awareness in Leadership",
  "Transformational Leadership from Within",
  "Clarity, Purpose, and Leadership Direction",
  "Overcoming Internal Barriers to Success",
  "Inner Strength as a Leadership Foundation",
  "Aligning Personal Values with Leadership Vision",
  "Personal Growth as a Leadership Strategy",
  "Building Confidence Through Self-Mastery",
  "Emotional Intelligence for Inner Leadership",
  "Leading with Authenticity and Purpose",
  "Developing a Growth-Oriented Mindset",
  "The Role of Reflection in Leadership Development",
  "Strengthening Inner Resilience and Focus",
  "Creating Impact Through Self-Leadership",
],
    fullDescription:
      "Theme: Leading from Within: Unlocking Inner Strength, Clarity, and Transformational Leadership",
  },
];

// ─────────────────────────────────────────────────────────────
//  REGION: NORTH AMERICA
//  Toronto, Canada · October 05–06, 2026
// ─────────────────────────────────────────────────────────────

const northAmericaConferences = [
  {
    id: "na-01",
    title: "Empowering Her Signature Global Conference: Women Redefining Power ",
    date: "March 22-23, 2027",
    location: "Toronto, Canada",
    city: "Toronto",
    country: "Canada",
    category: "women-leadership",   // ✅ fixed (was "wellness")
    region: "north-america",
    image: northamericaimg,   // ✅ correct
    description:
      "The Empowering Her Signature Global Conference: Women Redefining Power, hosted in Toronto, is a premier international gathering that brings together women leaders, entrepreneurs, and change-makers to explore the theme “Power Reimagined: The Science of Influence, Intelligence, and Impact.” This transformative conference is designed to redefine what power means in today’s world—shifting from authority to influence, emotional intelligence, resilience, and meaningful impact. \n\nAttendees will experience insightful keynotes, engaging panel discussions, and practical sessions focused on leadership, mindset, personal branding, and business growth. It offers a powerful platform to connect with global professionals, gain valuable insights, and build the confidence and clarity needed to lead with purpose. More than just an event, it is a movement empowering women to rise, create impact, and mark their signature on a global stage.",
    themes: [
  "Neural Leadership",
  "Cognitive Power",
  "Behavioral Influence",
  "Decision Science",
  "Algorithmic Bias",
  "Hormonal Intelligence",
  "Emotional Cognition",
  "Strategic Authority",
  "Social Dynamics",
  "Network Theory",
  "Performance Psychology",
  "Adaptive Leadership",
  "Influence Mapping",
  "Power Structures",
  "Innovation Systems",
  "Leadership Analytics",
  "Human Potential",
  "Cognitive Resilience",
  "Executive Function",
  "Impact Scaling"
],
  fullDescription:
      "Theme: Power Reimagined: The Science of Influence, Intelligence, and Impact",
  },

  {
    id: "na-02",
    title: "Resilient Woman Signature Mental Health & Leadership",
    date: "March 22-23, 2027",
    location: "Toronto, Canada",
    city: "Toronto",
    country: "Canada",
    region: "north-america",
    category: "women-leadership",   // ✅ fixed (was "wellness")
    image: northamericaimg1,       // ✅ correct — give this its own image key
    description:
      "The Resilient Woman Signature Mental Health & Leadership Conference arrives in Toronto as more than an event—it is a turning point for women who are ready to move beyond survival into sustainable success. Anchored in the theme “Beyond Burnout: The Science of Recovery, Resilience, and Leadership,” this experience blends neuroscience, psychology, and real-world leadership to redefine how high-achieving women operate in demanding environments. Here, burnout is not just addressed—it is decoded, challenged, and transformed into a pathway for clarity, strength, and renewed energy.\n\n Through powerful conversations, expert-led insights, and deeply reflective experiences, participants will uncover how to lead without depletion, perform without pressure, and succeed without sacrificing well-being. This is a space where ambition meets awareness, where leadership is humanized, and where every woman is invited to reset, realign, and rise—stronger, wiser, and unapologetically resilient.",
    themes: [
  "Stress Physiology",
  "Neural Resilience",
  "Emotional Regulation",
  "Cognitive Recovery",
  "Burnout Science",
  "Trauma Integration",
  "Sleep Optimization",
  "Brain Health",
  "Behavioral Therapy",
  "Mind Regulation",
  "Resilience Training",
  "Cognitive Flexibility",
  "Nervous System",
  "Performance Recovery",
  "Emotional Stability",
  "Stress Adaptation",
  "Mental Fitness",
  "Psychological Safety",
  "Adaptive Response",
  "Hormonal Balance"
],
    fullDescription:
      "Theme: Beyond Burnout: The Science of Recovery, Resilience, and Leadership",
  },

  {
    id: "na-03",
    title: "Signature Elite Summit on AI, Business, and Leadership ",
    date: "March 22-23, 2027",
    location: "Toronto, Canada",
    city: "Toronto",
    country: "Canada",
    region: "north-america",
    category: "ai-stem",   // ✅ fixed (was "wellness")
    image: northamericaimg2, // ✅ correct — give this its own image key
    description:
      "The Signature Elite Summit on AI, Business, and Leadership, hosted in Toronto, is a premier global gathering of industry leaders, innovators, and decision-makers, centered around the theme “Shaping the Future of Business Through AI and Visionary Leadership.” This high-impact summit explores how artificial intelligence is transforming modern enterprises and redefining leadership in an increasingly digital and data-driven world. Bringing together executives, entrepreneurs, and technology experts, the event offers strategic insights into AI adoption, business innovation, and future-ready leadership practices. \n\nThrough thought-provoking keynotes, executive discussions, and collaborative exchanges, participants will gain practical knowledge on leveraging AI to drive growth, enhance decision-making, and build competitive advantage. Designed for forward-thinking professionals, the summit provides a powerful platform to connect, learn, and lead with vision—empowering attendees to navigate change and shape the future of business with confidence.",
    themes: [
  "AI Strategy",
  "Digital Transformation",
  "Data Intelligence",
  "Predictive Analytics",
  "Automation Excellence",
  "Adaptive Leadership",
  "Visionary Leadership",
  "Executive Presence",
  "Strategic Leadership",
  "Business Innovation",
  "Growth Strategy",
  "Market Disruption",
  "Revenue Acceleration",
  "Scaling Success",
  "Future Work",
  "Innovation Mindset",
  "Ethical AI",
  "Emotional Intelligence",
  "Inclusive Leadership",
  "Competitive Advantage"
],
    fullDescription:
      "Theme: Shaping the Future of Business Through AI and Visionary Leadership",
  },

  {
    id: "na-04",
    title: "She Rises Within Signature Global Conference: From Vision to Legacy",
    date: "July 20–21, 2027",
    location: "Miami, Florida, USA",
    city: "Miami",
    country: "USA",
    region: "north-america",
    category: "women-leadership",   // ✅ fixed (was "wellness")
    image: northamericaimg3,   // ✅ fixed (was "na_resilientwoman") — add your own image
    description:
      "The She Rises Within Signature Global Conference: From Vision to Legacy, taking place in Miami, is a transformative global gathering designed for women who are ready to evolve from ambition into enduring impact. Set against the backdrop of Miami’s vibrant energy—renowned for its dynamic business landscape, cultural diversity, and spirit of innovation—the conference creates the perfect environment for bold ideas and powerful connections to flourish. Centered around the theme “Inner Architecture: The Science of Vision, Identity, and Lasting Legacy,” the event explores the deeper foundations of leadership, where clarity of vision, strength of identity, and intentional action converge to shape meaningful success. \n\nBringing together global thought leaders, entrepreneurs, and change-makers, the conference offers a compelling blend of strategic insight, psychological depth, and leadership development. Through immersive discussions and high-level exchanges, attendees will gain the tools to align their inner mindset with external achievements, build authentic influence, and create a legacy that extends far beyond business into lasting global impact.",
themes: [
  "Resilient Leadership",
  "Mindful Leadership",
  "Mental Strength",
  "Inner Power",
  "Emotional Intelligence",
  "Fearless Leadership",
  "Purposeful Leadership",
  "Confident Leadership",
  "Balanced Leadership",
  "Empowered Women",
  "Rising Leaders",
  "Limitless Potential",
  "Courageous Women",
  "Thrive Forward",
  "Mind Mastery",
  "Bold Leadership",
  "Inner Resilience",
  "Women Thrive",
  "Self-Leadership",
  "Growth Mindset"
],
    fullDescription:
      "Theme: Inner Architecture: The Science of Vision, Identity, and Lasting Legacy",
  },

  {
    id: "na-05",
    title: "The Rise of Unstoppable Women Signature Global Conference",
    date: "July 20–21, 2027",
    location: "Miami, Florida, USA",
    city: "Miami",
    country: "USA",
    region: "north-america",
    category: "wellness",           // ✅ kept as wellness (fits the theme)
    image: northamericaimg4,    // ✅ fixed — give it a unique image key
    description:
      "The Rise of Unstoppable Women Signature Global Conference, hosted in Miami, is a premier international platform designed for women who are driven to achieve exceptional growth, innovation, and high performance. Set in one of the world’s most dynamic and culturally vibrant cities—known for its thriving entrepreneurial ecosystem, global connectivity, and forward-thinking energy—this conference provides the ideal backdrop for powerful ideas and meaningful collaborations. Centered around the theme “Limitless Momentum: The Science of High Performance, Innovation, and Unstoppable Growth,” the event brings together influential leaders, entrepreneurs, and visionaries to explore the strategies, mindset, and systems required to sustain success in a rapidly evolving world. \n\nThrough high-impact discussions and transformative insights, attendees will gain the clarity, confidence, and tools needed to accelerate their growth, embrace innovation, and lead with purpose—empowering them to build momentum that is not only powerful, but truly unstoppable.",
    themes: [
  "Performance Science",
  "Cognitive Agility",
  "Growth Mindset",
  "Neural Drive",
  "Behavioral Strategy",
  "Decision Intelligence",
  "Risk Dynamics",
  "Innovation Systems",
  "Mental Conditioning",
  "Adaptive Performance",
  "Fear Processing",
  "Strategic Execution",
  "Human Potential",
  "Leadership Agility",
  "Peak Performance",
  "Cognitive Expansion",
  "Success Patterns",
  "Achievement Psychology",
  "Resilience Engineering",
  "Acceleration Models"
],
    fullDescription:
      "Theme: Limitless Momentum: The Science of High Performance, Innovation, and Unstoppable Growth",
  },

  {
    id: "na-06",
    title: "Global Women's Empowerment & Psychology Signature Forum Conference",
    date: "July 20–21, 2027",
    location: "Miami, Florida, USA",
    city: "Miami",
    country: "USA",
    region: "north-america",
    category: "wellness",           // ✅ kept as wellness
    image: northamericaimg5,      // ✅ fixed — unique image key
    description:
      "The Global Women’s Empowerment & Psychology Signature Forum Conference, taking place in Miami, is a distinguished international platform dedicated to advancing women’s personal and professional growth through the power of psychology and leadership. Set in a vibrant global hub known for its cultural diversity, entrepreneurial spirit, and dynamic energy, Miami offers the perfect environment for connection, inspiration, and forward-thinking dialogue. Centered around the theme “Rising with Purpose: Empowering Women Through Mindset, Leadership, and Growth,” the forum brings together thought leaders, psychologists, coaches, and industry experts to explore the critical role of mindset, emotional intelligence, and resilience in shaping impactful leadership.\n\nThrough insightful discussions and meaningful exchanges, participants will gain practical strategies to strengthen confidence, enhance decision-making, and unlock their full potential—empowering them to lead with purpose, drive growth, and create lasting impact in their careers and communities.",
themes: [
  "Gender Economics",
  "Policy Innovation",
  "Inclusive Leadership",
  "Equity Systems",
  "Governance Models",
  "Leadership Analytics",
  "Social Equity",
  "Economic Inclusion",
  "Diversity Metrics",
  "Impact Measurement",
  "Sustainable Development",
  "Policy Design",
  "Systemic Change",
  "Global Strategy",
  "Leadership Ethics",
  "Development Economics",
  "Inclusion Science",
  "Public Governance",
  "Social Innovation",
  "Equity Intelligence"
],
    fullDescription:
      "Theme: Inclusive Power: The Science of Global Leadership, Equity, and Systemic Transformation",
  },

  {
    id: "na-07",
    title: "Global Women Changemakers Signature Summit",
    date: "November 15–16, 2027",
    location: "Ontario, Canada",
    city: "Ontario",
    country: "Canada",
    region: "north-america",
    category: "women-leadership",   // ✅ fixed (was "wellness")
    image: northamericaimg6,    // ✅ fixed — unique image key
    description:
      "The Global Women Changemakers Signature Summit, hosted in Ontario, is a premier international gathering dedicated to empowering women who are driving meaningful change across industries and communities. Set in one of Canada’s most progressive and innovation-driven regions—renowned for its strong academic ecosystem, diverse talent, and global outlook—this summit offers an inspiring backdrop for collaboration and transformative dialogue. Centered around the theme “From Ideas to Impact: Scientific Pathways to Global Change,” the event brings together visionary leaders, researchers, entrepreneurs, and social innovators to explore evidence-based strategies for creating sustainable and scalable impact. \n\nThrough insightful discussions and high-level exchanges, participants will gain practical frameworks to turn ideas into action, leverage innovation for societal progress, and lead change with clarity, purpose, and measurable results on a global stage.",
themes: [
  "Social Innovation",
  "Impact Measurement",
  "Change Dynamics",
  "Behavioral Science",
  "Collective Intelligence",
  "Sustainability Models",
  "Innovation Ecosystems",
  "Development Systems",
  "Change Leadership",
  "Network Effects",
  "Data Analytics",
  "Impact Scaling",
  "Adaptive Systems",
  "Design Thinking",
  "Policy Innovation",
  "Community Dynamics",
  "Transformation Models",
  "Social Impact",
  "Global Solutions"
],
    fullDescription:
      "Theme: From Ideas to Impact: Scientific Pathways to Global Change",
  },

  {
    id: "na-08",
    title: "She Leads with Strength Signature Global Conference",
    date: "November 15–16, 2027",
    location: "Ontario, Canada",
    city: "Ontario",
    country: "Canada",
    region: "north-america",
    category: "women-leadership",   // ✅ fixed (was "wellness")
    image: northamericaimg7,        // ✅ fixed — unique image key
    description:
      "The She Leads with Strength Signature Global Conference, hosted in Ontario, is a distinguished international platform designed to empower women leaders to translate strength into strategic, high-impact leadership. Set within one of Canada’s most dynamic and progressive regions—recognized for its innovation ecosystem, diverse professional landscape, and global business connectivity—Ontario provides an ideal setting for meaningful collaboration and forward-thinking dialogue. Centered around the theme “From Strength to Strategy: Evidence-Based Approaches to Leadership Excellence,” the conference brings together accomplished leaders, researchers, and industry experts to explore data-driven insights, psychological frameworks, and proven methodologies that enhance leadership effectiveness.\n\nThrough engaging discussions and knowledge exchange, participants will gain practical tools to refine decision-making, strengthen strategic thinking, and lead with confidence, resilience, and measurable impact in today’s evolving global landscape.",
themes: [
  "Strength Science",
  "Neural Strength",
  "Cognitive Control",
  "Emotional Strength",
  "Performance Psychology",
  "Adaptive Leadership",
  "Resilience Engineering",
  "Stress Adaptation",
  "Mental Toughness",
  "Behavioral Strength",
  "Executive Function",
  "Cognitive Agility",
  "Leadership Dynamics",
  "Human Performance",
  "Strength Metrics",
  "Biofeedback Training",
  "Neural Efficiency",
  "Peak Performance",
  "Strategic Resilience",
  "Somatic Intelligence"
],
    fullDescription:
      "Theme: From Strength to Strategy: Evidence-Based Approaches to Leadership Excellence",
  },
];

// ─────────────────────────────────────────────────────────────
//  REGION: ASIA  (data ready — add to regionFilters when live)
//  Dubai, UAE · November 23–24, 2026
// ─────────────────────────────────────────────────────────────

const asiaConferences = [
  {
    id: "as-01",
    title: "Rise & Lead: The Global Women’s Leadership and Wellness",
    date: "March 08–09, 2027.",
    location: "Tokyo, Japan",
    city: "Tokyo",
    country: "Japan",
    region: "asia",
    category: "women-leadership",
    image: Asiaimg,
description: "Rise & Lead: The Global Womens Leadership and Wellness is a dynamic platform dedicated to empowering women to redefine leadership through strength, resilience, and holistic well-being. We believe that true leadership goes beyond titles—it is rooted in confidence, self-awareness, and the ability to inspire meaningful change in both personal and professional spaces. Our mission is to create a global community where women from diverse backgrounds can connect, grow, and thrive. Through transformative programs, thought-provoking conversations, and wellness-driven initiatives, we support women in unlocking their full potential while maintaining balance in mind, body, and purpose. At Rise & Lead, we champion a new era of leadership—one that embraces authenticity, prioritizes mental and physical wellness, and values collaboration over competition. We aim to equip women with the tools, insights, and support systems needed to navigate challenges, lead with courage, and build lasting impact in their communities and beyond. Together, we are shaping a future where women rise with strength, lead with resilience, and inspire the world." ,  themes: [
  "Womens Leadership & Psychological Wellbeing",
  "Emotional Intelligence & Self-Awareness",
  "Mental Health in Leadership",
  "Mindful Leadership & Cognitive Wellbeing",
  "Stress Management & Burnout Prevention",
  "Building Psychological Resilience in Women Leaders",
  "Overcoming Anxiety, Self-Doubt & Imposter Syndrome",
  "Trauma-Informed Leadership & Healing Practices",
  "Psychological Safety & Trust in Teams",
  "Work-Life Balance & Sustainable Leadership",
  "Self-Care as a Leadership Strategy",
  "Holistic Wellness: Mind, Body & Performance",
  "Leadership Confidence & Personal Growth",
  "Neuroscience of Mental Health & Leadership",
  "Inclusive Leadership & Workplace Wellbeing",
  "Resilience in Times of Change & Crisis",
  "Coaching, Mentorship & Leadership Development",
  "Creating Healthy & Supportive Work Cultures",
  "Purpose-Driven Leadership & Inner Alignment",
  "Future of Women’s Leadership & Wellbeing"
],
    fullDescription:
      "Theme: Redefining Leadership Through Strength and Resilience",
  },
  {
    id: "as-02",
    title: "Signature Global Legacy Conference  ",
    date: "March 08–09, 2027",
    location: "Tokyo, Japan",
    city: "Tokyo",
    country: "Japan",
    region: "asia",
    category: "business",
    image: Asiaimg1,
description: "The Signature Global Legacy Conference is a premier international platform dedicated to inspiring leaders, innovators, and change makers to build meaningful and lasting impact. This conference brings together global professionals, entrepreneurs, executives, and thought leaders to explore the principles of legacy-driven leadership, innovation, and sustainable growth in an ever-evolving world. Through impactful keynote sessions, expert-led panels, and interactive discussions, the conference focuses on shaping visionary leaders who not only succeed in the present but also create value for future generations. Participants will gain insights into strategic thinking, ethical leadership, personal branding, and long-term impact creation. Designed to foster collaboration and global connections, the conference provides a unique space to exchange ideas, share experiences, and build partnerships that drive progress. It empowers attendees to define their purpose, strengthen their leadership journey, and leave a lasting legacy that contributes to a more innovative, inclusive, and future-ready world."  ,
  themes: [
  "Legacy Leadership & Long-Term Impact",
  "Visionary Leadership & Future Thinking",
  "Purpose-Driven Leadership & Value Creation",
  "Innovation & Sustainable Growth",
  "Ethical Leadership & Governance",
  "Women in Leadership & Global Influence",
  "Entrepreneurship & Legacy Building",
  "Strategic Thinking & Decision-Making",
  "Leadership in a Changing Global Landscape",
  "Mentorship, Succession & Leadership Development",
  "Personal Branding & Thought Leadership",
  "Financial Growth & Wealth Legacy",
  "Social Impact & Community Leadership",
  "Diversity, Equity & Inclusive Leadership",
  "Resilience & Adaptability in Leadership",
  "Digital Transformation & Future Leadership",
  "Building High-Performance Organizations",
  "Collaboration, Partnerships & Global Networking",
  "Leadership Communication & Influence",
  "Creating a Future-Ready Leadership Ecosystem"
],
    fullDescription:
      "Theme: Building Lasting Impact: Leadership, Innovation, and Legacy for the Future",
  },
  {
    id: "as-03",
    title: "Thrive & Lead: Women’s Mental Health Signature Conference ",
    date: "June 25-26, 2027",
    location: "Melbourne, Australia",
    city: "melbourne",
    country: "Australia",
    region: "asia",
    category: "wellness",
    image: Asiaimg5,
    
description: "The Thrive & Lead: Women’s Mental Health Signature Conference is a transformative global platform dedicated to empowering women to prioritize their mental wellbeing while excelling in leadership. Bringing together women leaders, professionals, entrepreneurs, and mental health advocates, the conference focuses on the critical connection between mental health and sustainable leadership success. Through inspiring keynote sessions, expert-led panels, and interactive discussions, the event explores key topics such as emotional intelligence, stress management, burnout prevention, self-care, and resilience. Attendees will gain practical tools and strategies to strengthen their mental health, enhance their leadership capabilities, and navigate personal and professional challenges with confidence. The conference also fosters a supportive and inclusive environment for meaningful networking, knowledge sharing, and collaboration. It empowers women to lead with clarity, balance, and purpose while contributing to healthier workplaces and a more resilient global community.",
themes: [
  "Women’s Mental Health & Leadership",
  "Emotional Intelligence & Self-Awareness",
  "Stress Management & Burnout Prevention",
  "Building Mental Resilience in Women Leaders",
  "Mindfulness & Wellbeing in Leadership",
  "Overcoming Anxiety, Self-Doubt & Imposter Syndrome",
  "Work-Life Balance & Sustainable Success",
  "Self-Care as a Leadership Strategy",
  "Psychological Safety & Supportive Work Environments",
  "Trauma-Informed Leadership & Healing Approaches",
  "Holistic Wellness: Mind, Body & Performance",
  "Leadership Confidence & Personal Growth",
  "Mental Health in High-Performance Environments",
  "Coaching & Mentorship for Wellbeing",
  "Neuroscience of Mental Health & Leadership",
  "Inclusive Leadership & Workplace Wellbeing",
  "Resilience in Times of Change & Crisis",
  "Purpose-Driven Leadership & Inner Alignment",
  "Energy Management & Productivity",
  "Creating a Culture of Wellbeing in Organizations"
],
    fullDescription:
      "Theme:Thriving Minds, Empowered Leaders: Advancing Women’s Mental Health and Leadership Excellence",
  },
  {
    id: "as-04",
    title: "She Leads & Heals Signature Global Conference",
    date: "June 25-26, 2027",
    location: "Melbourne, Australia",
    city: "Melbourne",
    country: "Australia",
    region: "asia",
    category: "business",
    image: Asiaimg6,
description: "The She Leads & Heals Signature Global Conference is a transformative international platform dedicated to empowering women to lead with strength while prioritizing healing and holistic wellbeing. Bringing together women leaders, professionals, entrepreneurs, coaches, and changemakers from around the world, the conference explores the powerful connection between leadership, emotional healing, and personal growth. Through inspiring keynote sessions, expert-led panels, and interactive discussions, the event focuses on key areas such as mental wellness, emotional intelligence, resilience, self-awareness, and healing-centered leadership. Attendees will gain practical tools and strategies to overcome challenges, restore balance, and lead with clarity, compassion, and confidence. The conference fosters a supportive and inclusive environment for meaningful networking, knowledge sharing, and collaboration. It empowers participants to grow both personally and professionally, while contributing to a more compassionate, resilient, and future-ready leadership landscape.",
  themes: [
  "Women’s Leadership & Healing-Centered Approaches",
  "Emotional Intelligence & Compassionate Leadership",
  "Mental Health & Wellbeing in Leadership",
  "Mindfulness, Meditation & Inner Healing",
  "Trauma-Informed Leadership & Recovery",
  "Stress Management & Burnout Prevention",
  "Building Resilience Through Healing Practices",
  "Self-Awareness & Personal Transformation",
  "Work-Life Balance & Sustainable Leadership",
  "Self-Care as a Leadership Strategy",
  "Psychological Safety & Supportive Work Cultures",
  "Holistic Wellness: Mind, Body & Spirit",
  "Overcoming Anxiety, Self-Doubt & Emotional Barriers",
  "Purpose-Driven Leadership & Inner Alignment",
  "Coaching & Mentorship for Healing & Growth",
  "Energy Healing & Performance Optimization",
  "Leadership Confidence & Emotional Strength",
  "Creating Inclusive & Compassionate Organizations",
  "Healing Through Connection & Community Building",
  "Transformational Leadership & Global Impact"
],
    fullDescription:
      "Theme: Healing Leaders, Empowered Futures: Integrating Wellness, Purpose, and Impact",
  },
  {
    id: "as-05",
    title: "Signature Global Transformation Conference",
    date: "October  12-13, 2027",
    location: "Dubai, UAE",
    city: "Dubai",
    country: "UAE",
    region: "asia",
    category: "women-leadership",
    image: Asiaimg4,
description: "The Signature Global Future Leaders Conference is a dynamic international platform designed to inspire and equip the next generation of leaders with the skills, vision, and mindset needed to succeed in a rapidly evolving world. Bringing together emerging leaders, young professionals, entrepreneurs, and industry experts, the conference focuses on developing future-ready leadership capabilities and fostering innovation. Through engaging keynote sessions, expert-led panels, and interactive workshops, the event explores essential topics such as strategic thinking, digital transformation, leadership communication, entrepreneurship, and global collaboration. Attendees will gain practical insights, valuable tools, and real-world perspectives to enhance their personal and professional growth. The conference also provides a powerful networking environment, connecting participants with global mentors, industry leaders, and like-minded peers. It empowers individuals to build confidence, expand their vision, and step into leadership roles that drive meaningful impact and shape the future.",
themes: [
  "Transformational Leadership & Change Management",
  "Innovation & Disruptive Technologies",
  "Strategic Thinking & Future-Ready Leadership",
  "Digital Transformation & AI in Business",
  "Emotional Intelligence & Adaptive Leadership",
  "Organizational Transformation & Culture Change",
  "Entrepreneurship & Business Transformation",
  "Leadership in Times of Uncertainty",
  "Personal Growth & Leadership Transformation",
  "Resilience & Agility in Leadership",
  "Sustainable Development & Global Impact",
  "Diversity, Equity & Inclusive Transformation",
  "Leadership Communication & Influence",
  "Coaching, Mentorship & Leadership Development",
  "High-Performance Leadership Strategies",
  "Data-Driven Decision Making",
  "Social Innovation & Community Transformation",
  "Workforce Transformation & Future Skills",
  "Building Agile & Innovative Organizations"
],
    fullDescription:
      "Theme: Transforming Vision into Impact: Leadership, Innovation, and Global Change",
  },
  {
    id: "as-06",
    title: "Women’s Leadership and Psychological Wellbeing Signature Global Conference ",
    date: "October 12,13-2027",
    location: ":  Dubai, UAE",
    city: "Melbourne",
    country: "Australia",
    region: "asia",
    category: "women-leadership",
    image: Asiaimg7,
description: "The Women’s Leadership and Psychological Wellbeing Signature Global Conference is a premier international platform dedicated to empowering women leaders to thrive both personally and professionally. This conference brings together global leaders, professionals, mental health experts, and changemakers to explore the vital connection between effective leadership and psychological wellbeing. Through insightful keynote sessions, expert-led panels, and interactive discussions, the event focuses on key areas such as emotional intelligence, stress management, burnout prevention, resilience, and creating supportive work environments. Participants will gain practical strategies to enhance their mental wellbeing while strengthening their leadership capabilities. The conference fosters a collaborative and inclusive environment where attendees can share experiences, exchange ideas, and build meaningful global connections. It is designed to support women in leading with confidence, balance, and purpose, while contributing to healthier workplaces and a more resilient and empowered leadership community.",
    themes: [
  "Women’s Leadership & Psychological Wellbeing",
  "Emotional Intelligence & Self-Awareness",
  "Mental Health in Leadership",
  "Mindful Leadership & Cognitive Wellbeing",
  "Stress Management & Burnout Prevention",
  "Building Psychological Resilience in Women Leaders",
  "Overcoming Anxiety, Self-Doubt & Imposter Syndrome",
  "Trauma-Informed Leadership & Healing Practices",
  "Psychological Safety & Trust in Teams",
  "Work-Life Balance & Sustainable Leadership",
  "Self-Care as a Leadership Strategy",
  "Holistic Wellness: Mind, Body & Performance",
  "Leadership Confidence & Personal Growth",
  "Neuroscience of Mental Health & Leadership",
  "Inclusive Leadership & Workplace Wellbeing",
  "Resilience in Times of Change & Crisis",
  "Coaching, Mentorship & Leadership Development",
  "Creating Healthy & Supportive Work Cultures",
  "Purpose-Driven Leadership & Inner Alignment",
  "Future of Women’s Leadership & Wellbeing"
],
    fullDescription:
      "Theme: Empowered Minds, Transformative Leadership: Advancing Women’s Wellbeing and Impact",
  },
  
];




const conferenceSeed = [
  ...usaConferences, 
  ...europeConferences,
  ...northAmericaConferences, 
  ...asiaConferences, 
];

// ─────────────────────────────────────────────────────────────
//  EXPORTS
// ─────────────────────────────────────────────────────────────


const normalizeRegion = (region = "") => String(region).trim().toLowerCase();
const normalizeId = (id = "") => String(id).trim();

export const conferences = conferenceSeed.map((conference) => ({
  ...conference,
  region: normalizeRegion(conference.region),
}));

export const getConferencesByRegion = (region) =>
  conferences.filter((conference) => conference.region === normalizeRegion(region));

export const getConferenceByRegionAndId = (region, id) =>
  getConferencesByRegion(region).find(
    (conference) => normalizeId(conference.id) === normalizeId(id),
  );

export { usaConferences, europeConferences, northAmericaConferences, asiaConferences,};

export default conferenceSeed;
