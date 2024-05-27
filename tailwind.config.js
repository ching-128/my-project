import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
        "node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            width: {
                '70vw': '70vw',
            },
            height: {
                '50vh': '50vh',
            },
        },
    },
    plugins: [],
});