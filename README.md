Setup:
1. Clone or download the mini-storefront repository
2. If downloaded from Github, extract the zip file into a folder
3. Move file to C:\Users\yourname
4. Inside your terminal run:

cd mini-storefront-master

npm install

npm run dev
5. Visit "http://localhost:3000" on your browser of choice to visit the storefront page

Rubric Checklist:
Project Setup & Structure: The file was properly initialized & required files and file structure is present and functioning.

Components + JSX + Keys: All components utilize proper JSX structure and begin with "use client" when required

Props + Lifting State: Data flows from parent to child through props, while children communicate with parents through callbacks.

State + Controlled Inputs: useState manages filters and products, while controlled inputs manage categories and price filters.

Effects + Cleanup: Product data fetched from API route, provides simulated inventory changes, and clears intervals upon closing.

UX + Conditional Rendering: Displays proper UI for loading and errors.
