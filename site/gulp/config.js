'use strict';

module.exports = {
    'styles': {
        'src' : ['src/css/style.less','src/css/pygments.css'],
        'dest': 'static/css'
    },

    'scripts': {
        'src': [
            '../node_modules/jquery/dist/jquery.js',
            '../node_modules/bootstrap/js/modal.js',
            '../node_modules/bootstrap/js/collapse.js',
            '../node_modules/bootstrap/js/affix.js',
            '../node_modules/jquery.scrollto/jquery.scrollTo.js',
            '../node_modules/owlcarousel/owl-carousel/owl.carousel.js',
            '../node_modules/lightbox2/dist/js/lightbox.js',
            'src/js/**/*.js'
        ],
        'srcIE8': [
            'app/bower_components/respond/dest/respond.min.js',
            'app/bower_components/html5shiv/dist/html5shiv.min.js',
            'app/bower_components/es5-shim/es5-shim.js'
        ],
        'dest': 'static/js'
    },

    'images': {
        'src': ['src/images/**/*'],
        'dest': 'static/images',
        'posts': {
            'src': ['src/images/posts/**/*.png','src/images/posts/**/*.JPG'],
            'dest': 'static/images/posts'
        }
    },
    
    'rev': {
        'src': ['public/**/*.js', 'public/**/*.css'],
        'target': ['public/**/*.html'],
        'dest': 'public'
    } 
};
