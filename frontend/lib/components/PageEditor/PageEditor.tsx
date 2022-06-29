import React, { Ref, useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImage } from '../../images/uploadImage';
import { Editor as EditorType } from 'tinymce'
import pageCss from '../../pageCss';
import { getEditorTemplates } from '../../../pages/api/editor/templates';

interface PageEditorProps {
    onChange?: (content: string) => void
    onSaveContent?: (content: string) => void
    defaultValue?: string
    contentRef?: Ref<any>
}



export default function PageEditor({ onChange, onSaveContent, defaultValue, contentRef }: PageEditorProps) {
    const editorRef = useRef<EditorType>(null);
    // const log = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current);
    //         console.log(editorRef.current.ui);
    //         console.log(editorRef.current.ui.registry.getAll());
    //         // editorRef.current.activeEditor.ui.registry.getAll().buttons
    //     }
    // }

    function handleSubmit(e: any) {
        // alert("1")
        e.preventDefault()
        // const data = new FormData(e.target)
        // console.log(data.get('content'))
    }

    const templates = useMemo(() => getEditorTemplates(), [])

    function insertTemplate(template: typeof templates[0]) {
        editorRef.current?.execCommand('mceInsertTemplate', false, template.content);
        // editorRef.current?.execCommand('mceTemplate');
    }


    function InsertTemplateButton({ template }: any) {
        return <button
            type='button'
            onClick={e => {
                insertTemplate(template)
            }}
            style={{
                padding: '14px 22px',
                margin: '3px',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#F1F1F1',
                boxShadow: '0 2px 5px 0 rgba(0,0,0,0.2)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
            }}
        >{template.title}</button>
    }

    return (
        <div className='editor'>
            <InsertTemplateButton template={templates[0]} />
            <InsertTemplateButton template={templates[1]} />
            <InsertTemplateButton template={templates[2]} />
            <Editor
                onSaveContent={(e: any) => {
                    onSaveContent && onSaveContent(e.content)
                }}
                onSubmit={e => { e.preventDefault() }}
                tagName='content'
                apiKey='smha54v2x7w6495bp1bmrfea5f5if0mo40y8404x7697x1j9'
                onInit={(evt, editor) => {
                    (editorRef as any).current = editor;
                    contentRef && ((contentRef as any).current = (() => editor.getContent()))
                }}
                initialValue={defaultValue ?? "<p>This is the initial content of the editor.</p>"}
                init={{
                    save_onsavecallback: (e: any) => {
                        // onSaveContent && onSaveContent(editorRef.current.getContent())
                    },
                    images_upload_handler: (blobInfo, progress) => {
                        return new Promise((resolve, reject) => {
                            let p = 0
                            const timer = setInterval(() => {
                                p += (100 - p) / 10
                                progress(p)
                            }, 200)
                            uploadImage(blobInfo.base64()).then(url => {
                                clearInterval(timer)
                                resolve(url)
                            })
                        })
                    },
                    fontsize_formats: "8px 10px 12px 14px 15px 16px 18px 20px 24px 36px 40px 45px",
                    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
                    imagetools_cors_hosts: ['picsum.photos'],
                    menubar: 'file edit view insert format tools table help',
                    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                    toolbar_sticky: true,
                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    image_advtab: true,
                    link_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_list: [
                        { title: 'My page 1', value: 'https://www.tiny.cloud' },
                        { title: 'My page 2', value: 'http://www.moxiecode.com' }
                    ],
                    image_class_list: [
                        { title: 'None', value: 'img-default' },
                        { title: 'Some class', value: 'class-name' }
                    ],
                    importcss_append: true,
                    file_picker_callback: function (callback, value, meta) {
                        /* Provide file and text for the link dialog */
                        if (meta.filetype === 'file') {
                            callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
                        }

                        /* Provide image and alt text for the image dialog */
                        if (meta.filetype === 'image') {
                            const input = document.createElement('input');
                            input.type = 'file';

                            input.onchange = (e: any) => {
                                const file: File = e.target.files[0];
                                const reader = new FileReader();
                                reader.onload = (e: any) => {
                                    uploadImage(e.target.result.split(',')[1]).then(url => {
                                        callback(url)
                                    })
                                }
                                reader.readAsDataURL(file);
                            }

                            input.click();
                        }

                        /* Provide alternative source and posted for the media dialog */
                        if (meta.filetype === 'media') {
                            callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
                        }
                    },
                    templates: templates,
                    language: 'es',
                    // base_url: '',

                    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                    height: '100vh',
                    image_caption: true,
                    browser_spellcheck: true,
                    quickbars_selection_toolbar: 'bold italic quicklink h2 h3 blockquote quickimage quicktable',
                    noneditable_noneditable_class: 'mceNonEditable',
                    editable_class: 'mceEditable',
                    toolbar_mode: 'sliding',
                    contextmenu: 'link image imagetools table',
                    skin: 'oxide',
                    icons: "jam",
                    content_css: 'default',
                    font_family_formats: `Por defecto='Open Sans', sans-serif;Open Sans='Open Sans', sans-serif;Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n`,
                    content_style: `
                        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
                        body { 
                            font-family:'Open Sans', sans-serif;
                            font-size: 14pt;  
                        }

                        body {
                            padding: 0 22px;
                            margin: auto;
                            max-width: 730px;
                        }
                        
                        @media (min-width: 1300px) {
                            body {
                                max-width: 930px;
                            }
                        }
                        
                        @media (min-width: 1800px) {
                            body {
                                max-width: 1100px;
                            }
                        }

                        ${pageCss}
                        `,

                }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
        </div>
    );
}