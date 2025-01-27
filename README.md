# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Setup Instructions

1.  required in your computer

    - Node Js v14 or latest version
      - npm or yarn installed
        - git installed
          - code editor installed (VS Code)

2.  Setup the Project

    - git clone

    - cd

    - npm install

    - npm run dev

3.  Challanges Faced

    - As mentioned JSONPlaceholder doesn't persist data, requiring local state management to ensure UI updates immediately after API calls.
    - As I used Eslint strict environment I have to do a quick learn about propTypes as I am already fimiliar with Typescript interface it took me hardly 10-15 min for detailed understanding

4.  Implementations
    - I have used a different approach for CSS i.e Tailwind using Vite it has lesser setup to be done and easy and same as regular tailwind
      https://tailwindcss.com/docs/installation/using-vite
    - I have used React Hook Forms for forms with proper validations required for each input container using YUP. Reason to use is it reduces unnecessary re-renders make the forms highly performable
