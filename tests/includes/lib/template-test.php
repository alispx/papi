<?php

// Exit if accessed directly
defined( 'ABSPATH' ) || exit;

/**
 * Unit tests covering template functions.
 *
 * @package Papi
 */

class Papi_Lib_Template_Test extends WP_UnitTestCase {

	/**
	 * Setup the test.
	 *
	 * @since 1.0.0
	 */

	public function setUp() {
		parent::setUp();
		$this->post_id = $this->factory->post->create( array(
			'post_type' => 'page'
		) );
	}

	/**
	 * Tear down test.
	 *
	 * @since 1.3.0
	 */

	public function tearDown() {
		parent::tearDown();
		unset( $this->post_id );
	}

	/**
	 * Test `papi_body_class` function.
	 *
	 * @since 1.3.0
	 */

	public function test_papi_body_class() {
		global $post;

		$this->assertEmpty( papi_body_class( array() ) );

		$post = get_post( $this->post_id );
		$this->go_to( get_permalink( $this->post_id ) );
		$this->assertEmpty(  papi_body_class( array() ) );

		update_post_meta( $this->post_id, PAPI_PAGE_TYPE_KEY, '/' );
		$this->assertEmpty( papi_body_class( array() ) );

		update_post_meta( $this->post_id, PAPI_PAGE_TYPE_KEY, 'simple-page-type' );
		$this->assertEquals( array( 'simple-page-type' ), papi_body_class( array() )  );
	}

	/**
	 * Test `papi_include_template` function.
	 *
	 * @since 1.3.0
	 */

	public function test_papi_include_template() {
		$this->assertEmpty( papi_include_template( null ) );
		$this->assertEmpty( papi_include_template( array() ) );
		$this->assertEmpty( papi_include_template( new stdClass ) );
		$this->assertEmpty( papi_include_template( true ) );
		$this->assertEmpty( papi_include_template( false ) );

		papi_include_template( 'includes/admin/views/add-new-page.php' );
		$this->expectOutputRegex( '/Add\snew\spage/' );
	}

	/**
	 * Test `papi_template` function.
	 *
	 * @since 1.0.0
	 */

	public function test_papi_template() {
		$template = papi_template( papi_test_get_fixtures_path( '/properties/simple.php' ) );

		$this->assertEquals( 'Name', $template['title'] );
		$this->assertEquals( 'string', $template['type'] );

		$this->assertEmpty( papi_template( null ) );
		$this->assertEmpty( papi_template( true ) );
		$this->assertEmpty( papi_template( false ) );
		$this->assertEmpty( papi_template( 1 ) );
		$this->assertEmpty( papi_template( array() ) );
		$this->assertEmpty( papi_template( new stdClass() ) );

		$template = papi_template( papi_test_get_fixtures_path( '/properties/array.php' ), array(), true );

		$this->assertEquals( 'Name', $template->title );
		$this->assertEquals( 'string', $template->type );

		$this->assertEmpty( papi_template( 'hello' )  );
	}

	/**
	 * Test `template_include` filter.
	 *
	 * @since 1.3.0
	 */

	public function test_papi_template_include() {
		global $post;

		$this->assertEmpty( apply_filters( 'template_include', '' ) );

		$post = get_post( $this->post_id );
		$this->go_to( get_permalink( $this->post_id ) );
		$this->assertEmpty( apply_filters( 'template_include', '' ) );

		tests_add_filter( 'papi/settings/directories', function () {
			return array( 1,  papi_test_get_fixtures_path( '/page-types' ) );
		} );

		update_post_meta( $this->post_id, PAPI_PAGE_TYPE_KEY, 'simple-page-type' );
		$this->assertEmpty( apply_filters( 'template_include', '' ) );

		update_post_meta( $this->post_id, PAPI_PAGE_TYPE_KEY, 'twenty-page-type' );

		$path = get_template_directory();
		$path = trailingslashit( $path );
		$file = $path . 'functions.php';
		$path = apply_filters( 'template_include', '' );
		$this->assertNotFalse( strpos( $path, 'functions.php' ) );

	}

}
