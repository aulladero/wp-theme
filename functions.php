<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
function wpgt_scripts() {
	// Frontend scripts.
	if ( ! is_admin() ) {
		//wp_enqueue_script( 'jquery');
		// Enqueue vendors first.
		wp_enqueue_script( 'wpgt_vendorJs', get_template_directory_uri() . '/js/vendors.min.js' );
		// Enqueue custom JS after vendors.
		wp_enqueue_script( 'wpgt_customJs', get_template_directory_uri() . '/js/custom.min.js' );
		// Minified and Concatenated styles.
		wp_enqueue_style( 'wpgt_style', get_template_directory_uri() . '/style.min.css', array(), '1.0', 'all' );
	}
}
// Hook.
add_action( 'wp_enqueue_scripts', 'wpgt_scripts' );

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
