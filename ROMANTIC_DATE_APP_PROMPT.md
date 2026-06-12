# 🎀 Romantic Date App - Complete Development Prompt

## Project Overview
Create an interactive web-based dating app memorial/anniversary website. This is a romantic interactive experience that guides users through planning a date together. Users can select dates, times, food preferences, and culminates in a celebration screen that can be shared with their partner.

**Live Design Reference:** See the images in the Word document "Row_app_hẹn_hò.docx" for UI/UX inspiration.

---

## 📋 Project Specifications

### Tech Stack
- **Frontend:** Next.js 14+ with React (TypeScript recommended)
- **Styling:** Tailwind CSS + custom animations
- **Icons:** Lucide React
- **Deployment:** Vercel
- **UI Components:** Mobile-responsive design (target width: 390px for mobile mockup)

### Key Features

#### 1. **Progress Bar / Mission Tracker**
- Display 4 missions in sequence:
  1. ❤️ "Ask Out" (pre-completed ✓)
  2. ⏰ "Pick a Time" (pre-completed ✓)
  3. 🍽️ "Food Mission" (current)
  4. 💕 "Confirm" (locked)
- Show circular numbered badges (1, 2, 3, 4)
- Completed missions show checkmark with pink background
- Include a progress bar underneath showing completion percentage
- Mission titles appear below badges

#### 2. **Step 1: Date & Time Selection**
**Screen Title:** "When should our adventure begin? 🌸"

**Content:**
- Calendar input field with label: "Pick a date 📅"
  - Default date: 13/06/2026
  - Show calendar icon
- Time input field with label: "Choose a time 🕰️"
  - Default time: 20:10
  - Show clock icon
- Italic text below inputs: "Perfect! I'll save that special moment 💜"

**Interactions:**
- Both fields are editable
- Show smooth fade-in animation when step loads
- Next button labeled "Next Adventure →"

#### 3. **Step 2: Food Selection**
**Screen Title:** "Most important question... what should we eat? 😍"

**Food Options Grid (2x2 layout):**
```
1. Jollibee 🍗
2. Ramen 🍜
3. Hot Pot 🍲
4. BBQ 🥩
```

**Styling for Options:**
- Each option is a card with rounded corners
- Default: light gray border, white background
- Hovered: light pink border
- Selected: thick pink border (3px), light pink background, shadow effect
- Large emoji (text-4xl) centered above food name
- Smooth transitions for all state changes

**Interactions:**
- Clicking an option selects it
- Selected state shows visual feedback with border and background
- When food is selected, show italic text: "Excellent choice, future food critic! ❤️"
- "Next Adventure →" button becomes "Confirm & Send 💌" on this step

#### 4. **Celebration Screen**
**Trigger:** User clicks "Confirm & Send 💌"

**Layout:**
- Centered vertical layout
- Animated celebration circle with:
  - Size: 192px (w-48 h-48)
  - Pink/purple gradient background
  - Large couple emoji 💑 (text-8xl) in center
  - Pulsing animation
  - Floating sparkles ✨ and party emoji 🎉 with bounce animations around the circle

**Content:**
```
IT'S A DATE!!!
[Red Heart] 🎉
[Large emotional spacing]

I can't wait to see you.
Thank you for saying yes 💜

---

OUR BEAUTIFUL DATE PLAN ✨

[Date Card - Pink]
📅 Date
Saturday, June 13

[Time Card - Purple]
🕰️ Time
20:10

[Food Card - Rose]
🍽️ Food
[Selected Food Name]

[Italic text]
Everything looks perfect. One final tap and this date plan 
will be sent straight to your favorite person ❤️
```

**Below:**
```
Now go take a screenshot and send this to your favorite human ✨

[Start Again Button - Pink gradient]
```

**Animations:**
- Fade-in animation for entire celebration section
- Pulsing animation on couple emoji
- Bounce animation on sparkles (with staggered delays)
- Smooth color transitions

#### 5. **Mobile Phone Frame**
Wrap entire app in a phone mockup:
- Dark gray border (4px) to simulate phone bezel
- Rounded corners (rounded-3xl)
- Status bar at top (dark gray background):
  - Time: 23:24 (left)
  - Signal/WiFi icons (right)
- Subtle shadow (shadow-2xl)

#### 6. **Search Bar (Always Visible)**
- Gradient background (dark gray to darker gray)
- Left arrow button (back)
- Centered search input with placeholder: "Tìm nội dung liên quan"
- Right button labeled: "Tìm kiếm"
- Rounded pill shape for search input

#### 7. **Right Side Social Icons** (Decorative)
- Heart icon with "31,5K" text below
- Chat bubble icon with "159" text below
- These appear as decorative elements on the right side
- Semi-transparent/lower priority visually

---

## 🎨 Design System

### Color Palette
- **Primary Pink:** `#ec4899` (pink-500)
- **Dark Pink/Rose:** `#f43f5e` (rose-500)
- **Light Pink Background:** `#fce7f3` (pink-50)
- **Purple Accent:** `#c084fc` (purple-400)
- **Purple Light:** `#f3e8ff` (purple-50)
- **Rose Light:** `#ffe4e6` (rose-50)
- **Gray Text:** `#374151` (gray-700)
- **Light Gray:** `#d1d5db` (gray-300)
- **Dark Gray (Phone):** `#1f2937` (gray-800)

### Typography
- **Headings:** Bold, size 24-32px
- **Body text:** Regular, size 14-16px
- **Italic text:** For romantic/emotional messages

### Spacing & Layout
- Max width for mobile frame: 400px (md)
- Padding: 24px (px-6) for main content
- Gap between elements: 16-24px
- Border radius: mostly rounded-lg (8px) or rounded-xl (12px)
- Phone frame: rounded-3xl (24px)

### Animations
1. **Fade-in:** 300ms ease-in-out (for step transitions)
2. **Pulse:** Continuous (for celebration emoji)
3. **Bounce:** 1s infinite (for decorative elements)
4. **Hover transitions:** 200ms smooth

---

## 🔄 User Flow

```
Start
  ↓
[Progress Bar showing missions]
  ↓
Step 1: Date & Time Selection
  - User selects date (default: 13/06/2026)
  - User selects time (default: 20:10)
  - Click "Next Adventure →"
  ↓
Step 2: Food Selection
  - User clicks one of 4 food options
  - Selected option highlights with pink border
  - Click "Confirm & Send 💌"
  ↓
Celebration Screen
  - Show IT'S A DATE!!! with animations
  - Display selected date, time, food
  - Show romantic messages
  - "Start Again" button to reset
```

---

## 📱 Responsive Behavior

**Mobile First Approach:**
- Primary design: 390px viewport (mobile phone)
- Scale gracefully to tablet (768px) and desktop (1024px+)
- Phone frame should remain proportional on larger screens
- Stack vertically on mobile, can expand on desktop

**Breakpoints:**
- Mobile: < 640px (centered single column)
- Tablet: 640px - 1024px (centered, slightly larger frame)
- Desktop: > 1024px (centered with breathing room)

---

## 🚀 Deployment Instructions

### Option 1: Vercel (Recommended)
1. Create Next.js project: `npx create-next-app@latest romantic-date-app`
2. Place component in `app/page.tsx`
3. Install deps: `npm install lucide-react`
4. Push to GitHub
5. Connect to Vercel at https://vercel.com
6. Auto-deploys on push
7. Share live URL with partner

### Option 2: Self-hosted
- Build: `npm run build`
- Start: `npm start`
- Or use standalone HTML file export

---

## 📝 Component Structure

```
RomanticDateApp (Main Component)
├── State Management
│   ├── currentStep (0-1)
│   ├── selectedFood
│   ├── selectedDate
│   ├── selectedTime
│   └── showCelebration (boolean)
│
├── Phone Frame Container
│   ├── Status Bar
│   ├── Search Bar
│   ├── Progress Bar Section
│   │   ├── Mission Badges
│   │   └── Progress Indicator
│   │
│   ├── Content Area (Step-based rendering)
│   │   ├── Step 1: DateTime Selection
│   │   ├── Step 2: Food Selection
│   │   └── Celebration Screen
│   │
│   ├── Bottom Action Button
│   └── Right Decorative Icons
│
└── Global Styles
    ├── Animations (fadeIn, pulse, bounce)
    └── Tailwind utilities
```

---

## ✅ Acceptance Criteria

- [ ] All 4 UI screens fully functional (progress bar, date/time, food, celebration)
- [ ] Smooth transitions between steps with fade-in animations
- [ ] Food selection works with visual feedback (border highlight)
- [ ] Celebration screen shows all 3 details (date, time, food)
- [ ] All animations work smoothly (pulse, bounce, bounce with delay)
- [ ] Mobile phone frame mockup renders correctly
- [ ] Fully responsive (mobile 390px, tablet 768px, desktop 1024px+)
- [ ] Dark theme status bar and search bar styled correctly
- [ ] Social icons (heart, chat) visible on right side
- [ ] "Start Again" button resets app to initial state
- [ ] All emojis and icons render correctly
- [ ] No console errors
- [ ] Deploys to Vercel successfully
- [ ] Live link can be shared and opened in partner's browser

---

## 🎯 Nice-to-Have Features (Optional)

1. Add user's photo to celebration screen
2. Customize romantic messages per user
3. Add confetti animation on celebration
4. Share button to copy link to clipboard
5. Save date plan to localStorage
6. Dark mode toggle
7. Multi-language support
8. Sound effects on interactions
9. Ability to add custom food options
10. Calendar date picker instead of HTML input

---

## 📞 Questions & Clarifications

- Should the app remember selected choices if user refreshes? (Use localStorage?)
- Do you want confetti animation on celebration screen?
- Should there be a way to customize the romantic messages?
- Any specific fonts preference beyond Tailwind defaults?
- Should we include a feature to add user photos to celebration screen?

---

## 🎁 Final Notes

This is a romantic anniversary/memorial project. Pay attention to:
- Smooth, delightful animations
- Warm, romantic color palette
- Playful and emotional tone in copy
- Mobile-first experience
- Shareability (should look good when screenshotted)

The goal is to create a magical moment that can be shared with a loved one! ❤️

---

**Created for:** A special anniversary memorial
**Status:** Ready for development
**Priority:** High (Romantic surprise!)
