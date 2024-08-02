import mongoose, { InferSchemaType, HydratedDocument, Types } from 'mongoose';
import { OptionsType, templatesEnumValueArr } from './model-types';
import { AssetsType } from './Assets';
import { PageType } from './Page';
const Schema = mongoose.Schema;

const optionsObj: { [key: string]: OptionsType } = {
	title: {
		templates: {}
	},
	type: {
		required: true,
		enum: templatesEnumValueArr,
		formTitle: 'Template Type',
		select: true,
		enumKey: 'templateOptions'
	},
	showMobile: {
		default: true,
		formTitle: 'Show in Mobile'
	},
	description: {
		textbox: true,
		templates: {}
	},
	richDescription: {
		richText: true,
		formTitle: 'Rich Text'
	},
	extLink: {
		formTitle: 'External Link'
	},
	pagesIds: {
		formTitle: 'Page',
		filterType : false
	},
	linksIds: {
		formTitle: 'Links',
		filterType: true
	},
	assetsIds: {
		formTitle: 'Assets',
		filterType: true
	},
	// This could actually just be like extAssetLink, not videoId
	videoId: {
		formTitle: 'Exterior Asset To Link To',
		singleChoice: true,
		templates: {},
		filterType: true
	},
	schemaName: {
		default: 'Templates',
		hide: true,
		internal: true,
		required: true,
		enum: ['Templates']
	},
	isDuplicate: {
		default: false,
		hide: true,
		internal: true
	},
	updatedAt: {
		hide: true,
		internal: true
	},
	createdAt: {
		hide: true,
		internal: true
	}
}

const TemplatesSchema = new Schema({
	title: {
		type: String,
		...optionsObj.title
	},
	type: {
		type: String,
		...optionsObj.type
	},
	showMobile: {
		type: Boolean,
		...optionsObj.showMobile
	},
	description: {
		type: String,
		...optionsObj.description
	},
	richDescription: {
		type: String,
		...optionsObj.richDescription
	},
	extLink: {
		type: String,
		...optionsObj.extLink
	},
	linksIds: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Assets'
			}
		],
		...optionsObj.linksIds
	},
	assetsIds: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Assets'
			}
		],
		...optionsObj.assetsIds
	},
	videoId: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Assets'
			}
		],
		...optionsObj.videoId
	},
	pagesIds: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Page'
			}
		],
		...optionsObj.pagesIds
	},
	isDuplicate: {
		type: Boolean,
		...optionsObj.isDuplicate
	},
	schemaName: {
		type: String,
		...optionsObj.schemaName
	},
	updatedAt: {
		type: Date,
		default: Date.now,
		...optionsObj.updatedAt
	},
	createdAt: {
		type: Date,
		default: Date.now,
		...optionsObj.createdAt
	}
});
// ATTN: Remember to add new subdoc fields here with proper type omit below
export type TemplatesSubdocsType = {
	assetsIds: AssetsType[];
	videoId: AssetsType[];
	linksIds: AssetsType[];
	pagesIds: PageType[];
}
export type TemplatesTypeNoSubDoc = Omit<InferSchemaType<typeof TemplatesSchema>, 'assetsIds' | 'linksIds' | 'videoId' | 'pagesIds'>;
// export type TemplatesType = HydratedDocument<TemplatesTypeNoSubDoc & TemplatesSubdocsType>;
export type TemplatesType = TemplatesTypeNoSubDoc & TemplatesSubdocsType & { _id: string; typeName: 'Templates' };
export type HydratedTemplatesType = HydratedDocument<TemplatesType>;
const Templates =
	mongoose.models?.Templates || mongoose.model<TemplatesType>('Templates', TemplatesSchema, 'templates');

export default Templates;
