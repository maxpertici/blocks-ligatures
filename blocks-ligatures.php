<?php
/*
Plugin Name:  Block's Ligatures
Update URI:   https://wordpress.org/plugins/blocks-ligatures/
Plugin URI:   https://maxpertici.fr#blocks-ligatures
Description:  /
Version:      0.1
Author:       @maxpertici
Author URI:   https://maxpertici.fr
Contributors:
License:      GPLv2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
Text Domain:  blocks-ligatures
*/

defined( 'ABSPATH' ) or die();

use MXP\BlocksLigatures\Core\App;

$loader = require __DIR__ . '/vendor/autoload.php';

$App = new App( __FILE__ );
$App->load();




// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/**
 * Dev.
 */


 add_action( 'blocks_ligatures/init', function(){

    $image = [
        'label'   => 'Paragraph On Image',
        'slug'    => 'paragrah-on-image',
        'class'   => 'ligature-paragrah-on-image',
        'pattern' => [ 'core/image', 'core/paragraph' ]
    ];

    $paragrah = [
        'label'   => 'P.P.P',
        'slug'    => 'p-p-p',
        'class'   => 'ligature-p-p-p',
        'pattern' => [ 'core/paragraph', 'core/paragraph', 'core/paragraph'  ]
    ];

    mxp_register_blocks_ligatures( [ $image, $paragrah ] );

 });