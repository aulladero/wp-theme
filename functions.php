<?php

add_action('wp_enqueue_scripts', 'theme_enqueue_scripts');
function theme_enqueue_scripts(){
	
	wp_deregister_script('jquery');
	wp_register_script('jquery', get_bloginfo('template_url') . '/js/jquery.js', array(), false, false);
    wp_enqueue_script('jquery');

	wp_register_script('popper', get_bloginfo('template_url') . '/js/popper.js', array('jquery'), false, true);
    wp_enqueue_script('popper');

    wp_register_script('bootstrap', get_bloginfo('template_url') . '/js/bootstrap.js', array('jquery'), false, true);
    wp_enqueue_script('bootstrap');

    wp_register_script('slick', get_bloginfo('template_url') . '/js/slick.min.js', array('jquery'), false, true);
    wp_enqueue_script('slick');
	
    wp_register_script('custom', get_bloginfo('template_url') . '/js/custom.js', array('jquery','popper','bootstrap'), false, true);
    wp_enqueue_script('custom');

    wp_enqueue_style('fonts', 'https://fonts.googleapis.com/css?family=Abril+Fatface|Lato:300,400,700');
    wp_enqueue_style('style', get_bloginfo('template_url').'/style.css');
}


//Add Featured Image Support
add_theme_support('post-thumbnails');

// Clean up the <head>
function removeHeadLinks() {
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
}
add_action('init', 'removeHeadLinks');
remove_action('wp_head', 'wp_generator');

function register_menus() {
	register_nav_menus(
		array(
			'main-nav' => 'Main Navigation',
			'secondary-nav' => 'Secondary Navigation',
			'sidebar-menu' => 'Sidebar Menu'
		)
	);
}
add_action( 'init', 'register_menus' );

function register_widgets(){

	register_sidebar( array(
		'name' => __( 'Sidebar' ),
		'id' => 'main-sidebar',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

}//end register_widgets()
add_action( 'widgets_init', 'register_widgets' );

function custom_excerpt_length( $length ) {
    return 16;
}
add_filter( 'excerpt_length', 'custom_excerpt_length', 999 );

function new_excerpt_more( $more ) {
    return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');

function wds_get_ID_by_page_name($page_name)
{
     global $wpdb;
     $page_name_id = $wpdb->get_var("SELECT ID FROM $wpdb->posts WHERE post_name ='".$page_name."'");
     return $page_name_id;
}

add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

// Register Custom Navigation Walker
require_once get_template_directory() . '/class-wp-bootstrap-navwalker.php';

function add_specific_menu_location_atts( $atts, $item, $args ) {
    // check if the item is in the primary menu
    if( $args->theme_location == 'secondary-nav' ) {
      // add the desired attributes:
      $atts['class'] = 'nav-link';
    }
    return $atts;
}
add_filter( 'nav_menu_link_attributes', 'add_specific_menu_location_atts', 10, 3 );
