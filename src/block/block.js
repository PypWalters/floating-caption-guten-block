/**
 * BLOCK: floating-caption-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n

const {
	registerBlockType,
	className,
} = wp.blocks; // Import registerBlockType() from wp.blocks

const {
	PlainText,
	ColorPalette,
	InspectorControls,
	MediaUpload,
} = wp.editor; //Pull in components

const {
    Button,
		PanelBody,
		PanelColor,
		RadioControl,
} = wp.components;

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'cgb/block-floating-caption-block',
{
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Image and Caption' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'floating-caption-block — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		mediaID: {
				type: 'number',
		},
		mediaURL: {
				type: 'string',
				source: 'attribute',
				selector: '.fcb-bg-img',
				attribute: 'src',
				default: '',
		},
		imgAlt: {
      type: 'string',
      source: 'attribute',
      attribute: 'alt',
      selector: '.fcb-bg-img',
			default: '',
    },
		caption: {
        type: 'array',
        source: 'children',
        selector: '.fcb-caption',
    },
		captionColor: {
      type: 'string',
			default: '#777777',
    },
		captionBackground: {
      type: 'string',
			default: '#e1e1e1',
    },
		alignClass: {
        type: 'string',
				default: 'img-left',
    },
	},


	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: props => {
		const { attributes: { mediaID, mediaURL, imgAlt, caption, alignClass, captionBackground, captionColor},
			className, isSelected, setAttributes } = props;

		const onSelectImage = media => {
	    setAttributes( {
	        mediaURL: media.url,
	        mediaID: media.id,
					imgAlt: media.alt
	    } );
		};

		return (
			<div className={ className }>

				<InspectorControls>
				<PanelBody
					title={ __( 'Image Alignment' ) }
          initialOpen={ false }
				>
					<RadioControl
						selected={ alignClass }
						options={ [
								{ label: 'Left', value: 'img-left' },
								{ label: 'Right', value: 'img-right' },
						]}
						onChange={ alignClass => setAttributes( { alignClass } ) }
					/>
				</PanelBody>
				<PanelColor
					title={ __( 'Caption Background Color' ) }
					colorValue={ captionBackground }
					initialOpen={ false }
				>
						<ColorPalette
							value={ captionBackground }
							onChange={ captionBackground => setAttributes( { captionBackground } ) }
						/>
					</PanelColor>

					<PanelColor
						title={ __( 'Caption Text Color' ) }
						colorValue={ captionColor }
						initialOpen={ false }
					>
							<ColorPalette
								value={ captionColor }
								onChange={ captionColor => setAttributes( { captionColor } ) }
							/>
						</PanelColor>
				</InspectorControls>

				<div className={alignClass}>
					<div className={ !mediaURL ? 'fcb-bg-block-no-image' : 'fcb-bg-block' }>
						<MediaUpload
	            onSelect={onSelectImage}
	            type="image"
	            value={mediaID}
	            render={( { open } ) => (
	                <Button
										className={mediaURL ? 'image-button' : 'button button-large'}
										onClick={open}>
	                    {!mediaURL ? __( 'Upload Image' ) : <img src={mediaURL} />}
	                </Button>
	            )}
	        	/>
						</div>
						<div
							className='fcb-caption'
							style={
								{
									backgroundColor: captionBackground,
									color: captionColor,
								}
							}>
							<PlainText
								style={
									{
										backgroundColor: captionBackground,
										color: captionColor,
									}
								}
			          value={caption}
			          onChange={caption => setAttributes( { caption } )}
			        />
						</div>
				</div>
			</div>
		);
	},

	/**
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: props => {
		const { attributes: { mediaURL, imgAlt, caption, captionBackground, captionColor, alignClass},
			className } = props;

		return (
			<div className={ className }>
				<div className={alignClass}>
					<div className='fcb-bg-block' >
						<img alt={imgAlt} className='fcb-bg-img' src={ mediaURL } />
					</div>
					<div
						className='fcb-caption'
						style={
							{
								backgroundColor: captionBackground,
								color: captionColor,
							}
						}
						>{ caption }</div>
					</div>
			</div>
		);
	},
} );
