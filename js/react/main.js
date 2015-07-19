/* global requirejs */

requirejs.config({
    baseUrl: 'js/react',
    paths: {
        'react': 'https://cdnjs.cloudflare.com/ajax/libs/react/0.13.3/react',
    }
});

requirejs(['home']);