'use strict';

module.exports = {
    'browserport': 3000,
    'serverport': 9000,

    'styles': {
        'src': 'app/styles/**/*.less',
        'dest': 'public/styles'
    },

    'scripts': {
        'src': [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/bootstrap3-less-js/js/tooltip.js',
            'app/bower_components/bootstrap3-less-js/js/modal.js',
            'app/bower_components/bootstrap3-less-js/js/collapse.js',
            'app/bower_components/bootstrap3-less-js/js/affix.js',
            'app/bower_components/jquery.scrollTo/jquery.scrollTo.js',
            'app/bower_components/owlcarousel/owl-carousel/owl.carousel.js',
            'app/bower_components/lightbox2/dist/js/lightbox.js',
            'app/scripts/**/*.js'
        ],
        'srcIE8': [
            'app/bower_components/respond/dest/respond.min.js',
            'app/bower_components/html5shiv/dist/html5shiv.min.js',
            'app/bower_components/es5-shim/es5-shim.js'
        ],
        'dest': 'public/js'
    },

    'images': {
        'src': 'app/images/**/*',
        'destSrc': 'app/images',
        'dest': 'public/images'
    },

    'jekyll': {
        'root': 'app',
        'src': ['app/**/*.html', 'app/**/*.md', 'app/**/*.adoc'],
        'generatedSrc': [
            '.generated/**/*'
        ],
        'dest': 'public'
    },

    'generated': {
        'root': '.generated'
    },

    'dist': {
        'deploy': 'public/**/',
        'root': 'public'
    }

};
