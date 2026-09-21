import type { BlogCategorySeed, BlogPostSeed } from "../types";

export const enBlogCategories: BlogCategorySeed[] = [
  {
    translation_key: "kaygi",
    slug: "anxiety",
    name: "Anxiety",
    description: "Articles on how anxiety works, the cycles that maintain it and what actually helps.",
    order_index: 1,
  },
  {
    translation_key: "sinav-sureci",
    slug: "exam-period",
    name: "Exam Period",
    description: "Articles on motivation, study routines and performance pressure during exam preparation.",
    order_index: 2,
  },
  {
    translation_key: "ebeveynlik",
    slug: "parenting",
    name: "Parenting",
    description: "Articles on communicating with children and adolescents, boundaries and transition periods.",
    order_index: 3,
  },
  {
    translation_key: "ozsaygi",
    slug: "self-esteem",
    name: "Self-Esteem",
    description: "Articles on self-perception, the inner critical voice and the language we use with ourselves.",
    order_index: 4,
  },
  {
    translation_key: "iliskiler",
    slug: "relationships",
    name: "Relationships",
    description: "Articles on communication, boundaries and recurring patterns in close relationships.",
    order_index: 5,
  },
  {
    translation_key: "psikolojik-iyi-olus",
    slug: "wellbeing",
    name: "Psychological Wellbeing",
    description: "Habits and approaches that support mental wellbeing in everyday life.",
    order_index: 6,
  },
  {
    translation_key: "gunluk-yasam",
    slug: "everyday-life",
    name: "Everyday Life",
    description: "Routine, motivation and small but sustainable changes within daily life.",
    order_index: 7,
  },
];

export const enBlogPosts: BlogPostSeed[] = [
  {
    translation_key: "sinav-kaygisi-calismayi-surdurmek",
    slug: "studying-through-exam-anxiety",
    title: "Studying through exam anxiety",
    excerpt:
      "Removing anxiety entirely during an exam period is not a realistic goal. The more useful question is: how do I keep studying while anxiety is high?",
    category_key: "sinav-sureci",
    published_at: "2025-02-11",
    seo_title: "Studying Through Exam Anxiety | Ecesu Karslı",
    seo_description:
      "How exam anxiety makes studying harder, how the procrastination cycle forms, and what helps you keep studying when anxiety is high.",
    content: `One of the sentences I hear most often about exam periods is this: "If I could just stop being anxious, I'd be able to study." It sounds reasonable, but in practice it works against us. Once anxiety becomes a precondition, we make studying depend on a moment that never arrives.

A more useful question is: **how do I keep studying while anxiety is high?**

## What anxiety does, and where it stops helping

Anxiety is a system that prepares the body in the face of a possible threat. In situations that are uncertain and evaluative, like an exam, it is expected to switch on. At a certain level it sharpens attention and supports preparation.

The problem does not begin with the level of anxiety, but with our response to it. When anxiety rises, most people do one of two things: they postpone the subject entirely, or they sit at the desk for hours appearing to "study" without much happening. In both cases anxiety drops briefly and then returns stronger.

## How the procrastination cycle forms

The cycle usually runs like this:

1. You open a difficult topic.
2. The thought appears: "I don't understand this, there isn't enough time anyway."
3. Discomfort rises.
4. You reach for your phone; the discomfort drops immediately.
5. Later, guilt arrives and the thought "I'm not studying enough" grows stronger.

Notice that step four works. Avoidance genuinely brings relief. That is exactly why the cycle repeats. To break it, the source of relief has to change.

## Keeping going while anxiety is high

### Start small and defined

"I'll study maths today" is vague, and vagueness feeds anxiety. "I'll do ten questions from this unit" is defined and has a clear end. What lowers the threshold for starting is not the size of the goal but its clarity.

### Plan blocks, not hours

Long blocks are hard to sustain when anxiety is high. Study blocks of 25-30 minutes with short breaks give most students a workable structure. What matters is not returning to a screen during the break; a short walk or a glass of water actually rests attention.

### Read mock results as data

A mock exam is a measurement, not a verdict. Replacing "it went badly" with "which topics and which question types am I losing marks on?" turns the result into something usable. The shift sounds small, but its effect on motivation is large.

### Notice perfectionism

"I can't move on until I fully understand this topic" is often a protective sentence; it guards against the possibility of making mistakes. In exam preparation, though, it stops progress. Understanding a topic at seventy per cent and moving on is usually more productive than waiting for one hundred and never moving at all.

### Take the body into account

When sleep shortens, the anxiety threshold drops. Cutting sleep during an exam period returns the hours gained with interest. The same applies to regular meals and movement.

## For the day of the exam

Studying new material on the morning of an exam does little other than raise anxiety. What helps that day is simpler: a familiar routine, leaving early, a few minutes of slow breathing beforehand, and giving yourself permission in advance to skip a question you get stuck on.

A simple breathing method: breathe in through the nose for four seconds, out through the mouth for six. Making the out-breath longer than the in-breath signals to the body that it can settle. A few minutes is enough.

## When is support useful?

If anxiety is clearly disrupting your sleep, stopping you from studying for weeks, producing intense bodily symptoms (nausea, palpitations, dizziness) at the thought of the exam, or if the idea of not sitting the exam is growing stronger, you do not have to deal with it alone.

I have described how I work with exam anxiety on the [Exam-Related Anxiety](/en/services/exam-anxiety) page. How parents can offer support during this period is the subject of [Parent Counselling](/en/services/parent-counselling).

If you would like to read about the anxiety cycle more generally, see [my article on how the anxiety cycle works](/en/blog/how-the-anxiety-cycle-works).`,
  },
  {
    translation_key: "kaygi-dongusu",
    slug: "how-the-anxiety-cycle-works",
    title: "How the anxiety cycle works",
    excerpt:
      "Some of the things we do to reduce anxiety strengthen it over time. This article describes how the cycle forms and where it loosens.",
    category_key: "kaygi",
    published_at: "2025-03-04",
    seo_title: "How the Anxiety Cycle Works | Ecesu Karslı",
    seo_description:
      "How do avoidance and reassurance-seeking maintain anxiety? An article on how the anxiety cycle works and where it begins to loosen.",
    content: `Anxiety is a response to the possibility of a future threat. We think something that has not yet happened might happen, and the body prepares for it. In that sense anxiety is not a fault but a functional system.

What becomes difficult is less the anxiety itself than the cycle we build to manage it.

## The four steps of the cycle

### 1. Trigger

A thought, a bodily sensation or something external. A change in heart rate, an incoming email, a crowded room.

### 2. Interpretation

We attach a meaning to the trigger: "something is wrong", "I'll embarrass myself", "I won't finish in time". This interpretation is usually automatic; we make it without noticing.

### 3. Anxiety rises

The body prepares: the heart speeds up, muscles tense, attention narrows and locks onto the threat. Thoughts accelerate further.

### 4. Safety behaviour

We do something to bring the anxiety down: leave the situation, check the symptom, ask someone, postpone the plan, check again and again.

And here is the critical point: **the behaviour works.** Anxiety genuinely drops. Because it drops, the brain draws a lesson: "There was danger, and I did the right thing." So next time the interpretation is even stronger.

## Short-term relief, long-term maintenance

This is the most confusing part of the anxiety cycle. The things that feel good are the things that feed it:

- **Avoidance**: staying away from what triggers anxiety. Not giving the presentation, not entering a crowded space, postponing the conversation.
- **Reassurance-seeking**: asking "do you think something's wrong?", searching symptoms online, asking the same question to different people.
- **Over-checking**: checking the door repeatedly, rereading a message dozens of times before sending, constantly scanning the body.
- **Over-preparation**: planning far beyond what is needed in order to eliminate risk, which can end in never starting at all.

None of these are "wrong" behaviours. They all make sense. The problem is that with repetition they widen the territory anxiety occupies.

## Where does the cycle loosen?

### Making the interpretation visible

When anxiety rises we usually notice the result rather than the thought. We say "I'm tense" without knowing which sentence started it. Asking "what was the sentence going through my mind just now?" is the first step that slows the cycle.

### Probability instead of certainty

Turning "something bad is definitely going to happen" into "that could happen, and other things could too" is not optimism but accuracy. The aim is not to fool yourself, but to widen attention that has locked onto a single scenario.

### Reducing safety behaviours gradually

Dropping a checking behaviour all at once is rarely sustainable. Reducing its frequency step by step works better: if you check ten times a day, go to eight, then five. Experiencing at each step that anxiety rises and then falls on its own is the learning that actually loosens the cycle.

### Working on tolerating uncertainty

At the core of anxiety there is usually uncertainty. Since "being sure" is not an achievable goal, the work is more about being able to continue without being sure.

## When is support needed?

If anxiety is clearly narrowing your daily life; if the areas you avoid at work, at school or in relationships keep growing; if your sleep and appetite have been disrupted for a long time, dealing with the cycle alone becomes exhausting.

Where the focus is on bodily sensations, the [Health Anxiety](/en/services/health-anxiety) page describes how this cycle is addressed; for anxiety that rises around exams and performance, see [Exam-Related Anxiety](/en/services/exam-anxiety).`,
  },
  {
    translation_key: "ic-elestirel-ses",
    slug: "the-inner-critic-and-self-esteem",
    title: "The inner critical voice and self-esteem",
    excerpt:
      "The way we speak to ourselves is often made of sentences we would never say to anyone else. Here is where that voice comes from and how it changes.",
    category_key: "ozsaygi",
    published_at: "2025-04-08",
    seo_title: "The Inner Critic and Self-Esteem | Ecesu Karslı",
    seo_description:
      "How the inner critical voice forms, how it affects self-esteem, and how to develop a more balanced language towards yourself.",
    content: `I sometimes ask clients: "Would you say that sentence to a close friend?" The answer is almost always the same: "Of course not."

The way we speak to ourselves is often made of sentences we would say to no one. In the literature this is called the **inner critical voice**.

## Where does this voice come from?

The inner critic is not innate; it is learned. The feedback we heard early on, how success was spoken about at home, how mistakes were met at school — all of it shapes the tone of that voice.

For a child, meeting a caregiver's expectations is a way of staying safe. Over time, the child internalises criticism that comes from outside and builds a system that warns them in advance. At first that system is protective: "If I notice it first, the blow from outside will hurt less."

In adulthood, that protection often loses its function while its cost rises.

## How does it show up in daily life?

- Noticing what is missing first when you finish something
- Brushing off praise as "they're exaggerating"
- Replaying a small mistake in your mind for days
- Rehearsing a sentence dozens of times before voicing a request
- A clear drop in mood after comparison on social media
- Feeling guilty for a long time after saying no

These signs are not about a person actually being inadequate. They are common among high-achieving people too; sometimes achievement is even read as false evidence that the voice "works".

## Why "just believe in yourself" doesn't help

Self-esteem is not built through positive sentences said to a person. Telling someone to believe in themselves is not far from telling someone who feels inadequate not to feel it. The problem is not a lack of information but a learned way of relating.

For that reason the work begins not with encouragement but with understanding how the voice operates.

## Steps for working with the voice

### 1. Making the voice audible

The first step is putting the sentences into writing. Noting, exactly as it appeared, the sentence that went through your mind when anxiety or inadequacy rose. It sounds simple, but it turns the voice from background noise into text that can be examined.

### 2. Asking where it comes from

"Whose voice does this resemble?" often produces surprising answers. Sometimes it belongs to a teacher, sometimes a parent, sometimes to the atmosphere of a particular period.

### 3. Understanding its function

The critical voice is usually trying to protect something: against rejection, disappointment or repeating the same mistake. Once its function is understood, the voice stops being an enemy, which makes it easier to soften.

### 4. Building a balanced alternative

The aim is not to replace a harsh sentence with exaggerated praise. "I'm amazing" is as unrealistic as "I'm terrible", and it does not convince. The sentence that works is usually more measured: "I stumbled in a couple of places in that presentation, but I got the content across. I can work on the transitions next time."

### 5. Testing it at the level of behaviour

Self-esteem often changes through behaviour before thought. Setting a small boundary, voicing a request, accepting praise by saying "thank you". Each attempt produces new evidence against the voice.

## How long does this take?

Expecting a way of relating built over years to change in a few weeks is not realistic. Even so, noticing the voice brings noticeable relief early on, because the person can look at those sentences from the outside rather than identifying with them.

I have described how I work on this topic on the [Self-Esteem and Self-Perception](/en/services/self-esteem) page. Anxiety often rises in periods when the critical voice is loud; [the article on the anxiety cycle](/en/blog/how-the-anxiety-cycle-works) may help in seeing how the two feed each other.`,
  },
];
