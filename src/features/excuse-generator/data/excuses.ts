export interface Excuse {
  id: string;
  text: string;
  category: ExcuseCategory;
}

export type ExcuseCategory = 'health' | 'technical' | 'family' | 'miscellaneous';

export const categoryLabels: Record<ExcuseCategory, string> = {
  health: '🤒 Health',
  technical: '💻 Technical Issues',
  family: '👨‍👩‍👧 Family Emergency',
  miscellaneous: '🎲 Miscellaneous',
};

export const categoryColors: Record<ExcuseCategory, string> = {
  health: 'bg-red-100 text-red-700 border-red-200',
  technical: 'bg-blue-100 text-blue-700 border-blue-200',
  family: 'bg-purple-100 text-purple-700 border-purple-200',
  miscellaneous: 'bg-green-100 text-green-700 border-green-200',
};

export const excuses: Record<ExcuseCategory, string[]> = {
  health: [
    "I'm really sorry, but I wasn't able to complete {assignment} because I came down with a terrible migraine yesterday. The pain was so intense I couldn't look at any screens.",
    "Unfortunately, I couldn't submit {assignment} on time because I had a severe allergic reaction and had to go to urgent care. I have a doctor's note if needed.",
    "I apologize for not having {assignment} ready. I've been dealing with food poisoning since last night and could barely get out of bed.",
    "I'm sorry {teacher}, but I couldn't work on {assignment} because I twisted my wrist pretty badly. It's been difficult to type or write anything.",
    "I hate to ask for an extension, but I've had the worst stomach bug this week. I was completely bedridden and couldn't focus on any schoolwork.",
    "My sinuses have been absolutely killing me, and the pressure made it impossible to concentrate on {assignment}. I could barely keep my eyes open.",
    "I had an unexpected dental emergency yesterday - a filling came out and the pain was unbearable until I could see a dentist.",
  ],
  technical: [
    "My laptop completely crashed last night while I was working on {assignment}, and I lost everything. I'm trying to recover the files but it's not looking good.",
    "Our internet has been down for the past two days due to a neighborhood outage. The provider says it won't be fixed until tomorrow.",
    "I finished {assignment} but my computer got a virus and now I can't access any of my files. I'm taking it to get fixed today.",
    "The power went out in my area last night during a storm, and my laptop died before I could save my work on {assignment}.",
    "I was about to submit {assignment} when my computer did a mandatory update that took 3 hours and then wouldn't start up properly.",
    "My USB drive with all my work got corrupted. I've tried everything but {assignment} seems to be lost. I'm devastated.",
    "The school's online submission portal kept giving me errors all night. I have screenshots of the error messages to prove it.",
    "My cloud storage said it synced but when I checked this morning, the latest version of {assignment} wasn't there.",
  ],
  family: [
    "I had to help take care of my younger sibling unexpectedly because my parents had an emergency, so I couldn't finish {assignment}.",
    "We had a family emergency last night and had to rush to the hospital. Everything is okay now, but I wasn't able to complete {assignment}.",
    "My grandmother had to be taken to the ER, and I was helping my parents the whole time. I completely forgot about {assignment} in the chaos.",
    "We had unexpected family visitors from out of town, and my parents needed me to help host. I didn't have time to work on {assignment}.",
    "There was a minor crisis at home with our plumbing flooding, and I spent all night helping clean up instead of working on {assignment}.",
    "My pet got very sick and we had to make an emergency vet visit. I was too worried and distracted to focus on {assignment}.",
    "We had to suddenly move my elderly relative into our home, and the whole family was busy preparing. {assignment} slipped my mind entirely.",
  ],
  miscellaneous: [
    "I'm so sorry, but I genuinely thought {assignment} was due next week. I must have written the wrong date in my planner.",
    "My backpack was stolen yesterday with all my notebooks and completed {assignment} inside. I filed a police report and everything.",
    "I was stuck on public transit for 3 hours due to a breakdown and my phone died, so I couldn't access the online materials for {assignment}.",
    "I had to attend a mandatory family event that ran much longer than expected. By the time I got home, it was way too late to start {assignment}.",
    "There was a fire alarm at my apartment building last night and we were evacuated for hours. I couldn't get back in to finish {assignment}.",
    "I accidentally left {assignment} on the bus this morning. I called the transit company but they haven't found it yet.",
    "I was working on {assignment} at the library when they had to close early for an emergency. All my materials were locked inside.",
    "My dog actually did eat my homework. Well, she chewed up my notebook with all my notes for {assignment}. I know it sounds fake but it really happened.",
  ],
};

export function getRandomExcuse(category?: ExcuseCategory): { excuse: string; category: ExcuseCategory } {
  const selectedCategory = category || getRandomCategory();
  const categoryExcuses = excuses[selectedCategory];
  const randomIndex = Math.floor(Math.random() * categoryExcuses.length);
  
  return {
    excuse: categoryExcuses[randomIndex],
    category: selectedCategory,
  };
}

export function getRandomCategory(): ExcuseCategory {
  const categories: ExcuseCategory[] = ['health', 'technical', 'family', 'miscellaneous'];
  return categories[Math.floor(Math.random() * categories.length)];
}

export function personalizeExcuse(excuse: string, name?: string, assignment?: string, teacher?: string): string {
  let personalized = excuse;
  
  if (name) {
    personalized = personalized.replace(/\{name\}/g, name);
  }
  
  if (assignment) {
    personalized = personalized.replace(/\{assignment\}/g, `"${assignment}"`);
  } else {
    personalized = personalized.replace(/\{assignment\}/g, 'the assignment');
  }
  
  if (teacher) {
    personalized = personalized.replace(/\{teacher\}/g, teacher);
  } else {
    personalized = personalized.replace(/\{teacher\}/g, '');
    personalized = personalized.replace(/\s+,/g, ',').replace(/\s+\./g, '.');
  }
  
  return personalized.trim();
}
