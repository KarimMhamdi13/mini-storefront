Setup:
1. Clone or download the mini-storefront repository
2. Inside your terminal run:
cd mini-storefront
npm intsall
npm run dev
3. Visit "http://localhost:3000" on your browser of choice ot visit the storefront page

Rubric Checklist:
Project Setup & Structure: The file was properly initializedrequired files and file structure is present and functioning.

Components + JSX + Keys: All components utilize proper JSX structure and begin with "use client" when required

Props + Lifting State: Dat flows from parent to child through props, while child communicates with parents through callbacks.

State + Controlled Inputs: useState manages filters and products, while controlled inputs manage categories and price filters.

Effects + Cleanup: Product data fetched from API route, provides simulated inventory changes, and clears intervals upon closing.

UX + Conditional Rendering: Displays proper UI for loading and errors.