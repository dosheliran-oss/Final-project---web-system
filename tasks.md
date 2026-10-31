<div dir="rtl">

# Star Wars Explorer · תוכנית עבודה

> המשימות כתובות לפי סדר הבנייה. מה בונים ולמה, ותנאי הקבלה המלאים, נמצאים ב-[`PRD.md`](PRD.md).

**איך עובדים:**
- עובדים על **משימה אחת בכל פעם**, לפי הסדר.
- משימה נחשבת גמורה רק כשכל התנאים בשורת **Done when** מתקיימים.
- בסוף כל משימה: בודקים בעיניים, מריצים `npm test` ו-`npm run build`, ואז עושים **commit** (יחד עם `PROMPTS.md`).
- מסמנים `[x]` ליד משימה שהסתיימה.

---

## שלב א' · תשתית

- [x] **0. הקמת הפרויקט**
  יצירת אפליקציית React + Vite + TypeScript מתוך התבנית.
  **Done when:** `npm run dev` מציג את עמוד הפתיחה של Vite.

- [x] **1. ניקוי התבנית**
  מחיקת התוכן לדוגמה של Vite מ-`App.tsx`, `App.css` ו-`index.css`, ומחיקת התמונות שלא בשימוש.
  **Done when:** האפליקציה מציגה כותרת "Star Wars Explorer" בלבד, ו-`npm run build` עובר.

- [x] **2. ניתוב ותפריט ניווט**
  התקנת `react-router-dom`. יצירת ארבעה עמודים (`ListPage`, `DetailPage`, `FavoritesPage`, `ComparePage`) ועמוד `NotFoundPage`. הגדרת הכתובות לפי סעיף 4 ב-PRD, ויצירת רכיב `Navbar` עם `NavLink`.
  **Done when:** לחיצה על כל קישור בתפריט מחליפה עמוד וכתובת, הקישור הפעיל מודגש, ו-`/abc` מציג את עמוד ה-404.

## שלב ב' · עמוד הרשימה (Master)

- [x] **3. משיכת הרשימה ושלושת המצבים**
  ב-`ListPage`: `fetch` ל-`/people` בתוך `useEffect`. יצירת רכיב `StatusMessage` להצגת מצב טעינה ומצב שגיאה. יצירת `src/utils/helpers.ts` עם הפונקציה `getIdFromUrl` לחילוץ המזהה מה-`url`.
  **Done when:** בטעינה מופיע "Loading characters...", אחר כך מוצגת רשימת השמות, ובניתוק הרשת (DevTools ← Offline) מופיעה הודעת שגיאה. אין שגיאות בקונסול.

- [x] **4. טיפוסים ופונקציות עזר + Vitest**
  הוספת הממשקים `Planet` ו-`Film` ל-`src/types/index.ts`. הוספת הפונקציה `parseMeasurement` ל-`src/utils/helpers.ts` (ממירה `"1,358"` ל-1358 ו-`"unknown"` ל-`null`). התקנת Vitest ו-`@vitest/ui`, והוספת הסקריפטים `test` ו-`test:ui`.
  **Done when:** `npm run test:ui` פותח את ממשק הבדיקות בדפדפן, ו-`npm test` מריץ לפחות 5 בדיקות שעוברות על `getIdFromUrl` ו-`parseMeasurement`, כולל המקרים `unknown` ופסיק אלפים.

## שלב ג' · עמוד הפרטים (Detail)

- [x] **5. עמוד פרטי דמות וקריאות מקוננות**
  ב-`DetailPage`: קריאת `id` עם `useParams`, ו-`fetch` ל-`/people/:id`. אחר כך משיכת כוכב הבית וכל הסרטים במקביל עם `Promise.all`. הוספת קישור "Back to list".
  **Done when:** `/items/1` מציג את כל הנתונים של Luke, כולל "Tatooine" ושמות 4 הסרטים ממוינים לפי מספר הפרק (ולא קישורים). ערכי `unknown` מוצגים כ-"Unknown", `/items/9999` מציג "Character not found", והקישור מחזיר לרשימה.

## שלב ד' · חיפוש

- [x] **6. חיפוש**
  יצירת רכיב `SearchBar` ופונקציה טהורה `filterCharacters(list, query)`. הסינון נעשה על הרשימה שכבר נטענה, בלי קריאת רשת נוספת.
  **Done when:** הקלדת `sky` מציגה רק את בני משפחת Skywalker, שם שלא קיים מציג "No characters found", ויש בדיקות ל-`filterCharacters` (אותיות גדולות וקטנות, רווחים, חיפוש ריק).

## שלב ה' · מועדפים

- [x] **7. מועדפים**
  ה-state של המועדפים נשמר ב-`App` ועובר לעמודים ב-props. כתיבת פונקציה טהורה `toggleFavorite` ושמירה ב-`localStorage` עם `useEffect`. יצירת רכיב `FavoriteButton` (⭐) לשימוש ברשימה ובעמוד הפרטים. בעמוד המועדפים: הצגת המועדפים, כפתור "Remove" לכל דמות, והודעה כשהרשימה ריקה.
  **Done when:** סימון ⭐ ברשימה מופיע גם בעמוד הפרטים ולהפך, הסימון נשמר אחרי F5, כל תנאי הקבלה של עמוד 3 ב-PRD מתקיימים, ויש בדיקות ל-`toggleFavorite` (הוספה, הסרה, בלי כפילויות).

## שלב ו' · ראש בראש (Compare)

- [x] **8. ראש בראש**
  יצירת רכיב `CharacterSelect`, ושני מופעים שלו ב-`ComparePage`. כתיבת פונקציה טהורה `compareStat(a, b)` שמחזירה את המנצח ואת ההפרש, או `null` כשאחד הערכים חסר. יצירת רכיב `CompareTable`.
  **Done when:** שתי התיבות מציגות את כל הדמויות, בחירה של אותה דמות פעמיים מציגה הודעה, Luke מול Chewbacca מראה ש-Chewbacca גבוה יותר ב-56 ס"מ, ערך `unknown` לא מכריז על מנצח, ויש בדיקות ל-`compareStat`.

## שלב ז' · גימור

- [ ] **9. עיצוב ורספונסיביות**
  CSS משלי בנושא Star Wars, ותצוגה תקינה במסך צר.
  **Done when:** האפליקציה נראית טוב ברוחב 375px (DevTools ← מצב מובייל), בלי גלילה אופקית.

- [ ] **10. README.md**
  החלפת ה-README של Vite בתיאור הפרויקט.
  **Done when:** ה-README מסביר מה האפליקציה עושה, איך מריצים אותה (`npm install`, `npm run dev`), איך מריצים את הבדיקות (`npm test`, `npm run test:ui`), ובאיזה API משתמשים.

- [ ] **11. בדיקה סופית לפני הגשה**
  מעבר על כל תנאי הקבלה ב-PRD.
  **Done when:** `npm run build`, `npm test` ו-`npm run lint` עוברים, אין `any` בקוד, אין שגיאות בקונסול, וה-repo ציבורי ב-GitHub.

---

## בונוס (אחרי שהכול עובד)
- [ ] בדיקות לרכיבים עם React Testing Library (למשל `SearchBar` ו-`FavoriteButton`).
- [ ] קובץ `docs/architecture.md` עם מבנה הרכיבים וזרימת המידע, וקישור אליו מה-PRD.

</div>
