import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    :root {

        & {
            --color-white: #fff;

            --color-grey-0:#f8f9fa;
            --color-grey-1:#f1f3f5;
            --color-grey-2:#e9ecef;
            --color-grey-3:#dee2e6;
            --color-grey-4:#ced4da;
            --color-grey-5:#adb5bd;
            --color-grey-6:#868e96;
            --color-grey-7:#495057;
            --color-grey-8:#343a40;
            --color-grey-9:#212529;

            --color-blue-8: #0a2d4e;

            --table-header-bg-color: #0a2d4e;
            --table-header-text-color: var(--color-white);
            --table-data-bg-odd-row-color: var(--color-grey-0);
            --table-data-bg-even-row-color: var(--color-grey-2);
        }

    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        /* Creating animations for dark mode */
        transition: background-color 0.3s, border 0.3s;
    }

    html {
        font-size: 62.5%;
    }

    /* body {
        font-family: 'Roboto', sans-serif;
        font-size: 1.6rem;
    } */
    
    body {
    font-family: "Roboto", sans-serif;
    color: var(--color-grey-7);

    transition: color 0.3s, background-color 0.3s;
    min-height: 100vh;
    line-height: 1.5;
    font-size: 1.6rem;
    }

    h1 {
        height: 2rem;
    }

    .container {
        margin: 0 auto;
        padding: 10px;
        max-width: 120rem;
    }

    *::placeholder {
        color: #ced4da;
        opacity: 1;
    }

    table tbody tr:nth-child(odd) {
        background-color: var(--table-data-bg-odd-row-color);
    }

    table tbody tr:nth-child(even) {
    background-color: var(--table-data-bg-even-row-color);
    }

    /* input,
    button,
    textarea,
    select {
    font: inherit;
    color: inherit;
    } */

    button {
    cursor: pointer;
    }

    *:disabled {
    cursor: not-allowed;
    }

    /* select:disabled,
    input:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    } */

    /* input:focus,
    button:focus,
    textarea:focus,
    select:focus {
    outline: 2px solid var(--color-brand-600);
    outline-offset: -1px;
    } */

    /* Parent selector, finally 😃 */
    /* button:has(svg) {
    line-height: 0;
    } */

    /* a {
    color: inherit;
    text-decoration: none;
    } */

    /* ul {
    list-style: none;
    } */

    /* p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    overflow-wrap: break-word;
    hyphens: auto;
    } */

    /* img {
    max-width: 100%; */

    /* For dark mode */
    filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
    
`;

export default GlobalStyles;
