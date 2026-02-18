"use client";
import { useEffect, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import {
    HiArrowPath,
    HiBold,
    HiChatBubbleLeftRight,
    HiItalic,
    HiLink,
    HiListBullet,
    HiSparkles,
    HiStrikethrough,
    HiUnderline,
} from "react-icons/hi2";
import {
    MdFormatAlignCenter,
    MdFormatAlignLeft,
    MdFormatAlignRight,
    MdFormatListNumbered,
} from "react-icons/md";

const RichTextEditor = ({ value = "", onChange, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3, 4] },
                history: { depth: 300 },
                bulletList: { keepMarks: true },
                orderedList: { keepMarks: true },
            }),
            Underline,
            Highlight.configure({ multicolor: false }),
            Link.configure({ openOnClick: true, linkOnPaste: true }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Placeholder.configure({
                placeholder:
                    placeholder ??
                    "Describe the HR update, policy, or note in a clear, professional tone.",
            }),
        ],

        editorProps: {
            attributes: {
                "aria-label": "HR memo editor",
                class:
                    "min-h-[110px] h-auto text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none",
            },
        },

        content: value,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false),
        immediatelyRender: false,
    });

    useEffect(() => {
        if (!editor) return;
        const nextValue = value ?? "";
        if (nextValue !== editor.getHTML()) {
            editor.commands.setContent(nextValue, false);
        }
    }, [editor, value]);

    const toolbarGroups = useMemo(() => {
        if (!editor) return [];

        const buildAction = (
            id,
            label,
            handler,
            isActive = () => false,
            title,
            Icon
        ) => ({
            id,
            label,
            title,
            handler,
            isActive,
            Icon,
        });

        return [
            [
                buildAction(
                    "bold",
                    "Bold",
                    () => editor.chain().focus().toggleBold().run(),
                    () => editor.isActive("bold"),
                    "Bold",
                    HiBold
                ),
                buildAction(
                    "italic",
                    "Italic",
                    () => editor.chain().focus().toggleItalic().run(),
                    () => editor.isActive("italic"),
                    "Italic",
                    HiItalic
                ),
                buildAction(
                    "underline",
                    "Underline",
                    () => editor.chain().focus().toggleUnderline().run(),
                    () => editor.isActive("underline"),
                    "Underline",
                    HiUnderline
                ),
                buildAction(
                    "highlight",
                    "Highlight",
                    () => editor.chain().focus().toggleHighlight().run(),
                    () => editor.isActive("highlight"),
                    "Highlight",
                    HiSparkles
                ),
            ],
            [
                buildAction(
                    "bullet-list",
                    "Bullets",
                    () => editor.chain().focus().toggleBulletList().run(),
                    () => editor.isActive("bulletList"),
                    "Bullet list",
                    HiListBullet
                ),
                buildAction(
                    "ordered-list",
                    "Numbers",
                    () => editor.chain().focus().toggleOrderedList().run(),
                    () => editor.isActive("orderedList"),
                    "Numbered list",
                    MdFormatListNumbered
                ),
                buildAction(
                    "blockquote",
                    "Quote",
                    () => editor.chain().focus().toggleBlockquote().run(),
                    () => editor.isActive("blockquote"),
                    "Quote",
                    HiChatBubbleLeftRight
                ),
            ],
            [
                buildAction(
                    "align-left",
                    "Align left",
                    () => editor.chain().focus().setTextAlign("left").run(),
                    () => editor.isActive({ textAlign: "left" }),
                    "Left align",
                    MdFormatAlignLeft
                ),
                buildAction(
                    "align-center",
                    "Align center",
                    () => editor.chain().focus().setTextAlign("center").run(),
                    () => editor.isActive({ textAlign: "center" }),
                    "Center align",
                    MdFormatAlignCenter
                ),
                buildAction(
                    "align-right",
                    "Align right",
                    () => editor.chain().focus().setTextAlign("right").run(),
                    () => editor.isActive({ textAlign: "right" }),
                    "Right align",
                    MdFormatAlignRight
                ),
            ],
            [
                buildAction(
                    "link",
                    "Link",
                    () => {
                        if (typeof window === "undefined") return;
                        const href = window.prompt("Insert a link for this HR resource");
                        const trimmed = href?.trim();
                        if (!trimmed) return;
                        const normalized = trimmed.startsWith("http")
                            ? trimmed
                            : `https://${trimmed}`;
                        editor
                            .chain()
                            .focus()
                            .extendMarkRange("link")
                            .setLink({ href: normalized })
                            .run();
                    },
                    () => editor.isActive("link"),
                    "Insert link",
                    HiLink
                ),
                buildAction(
                    "clear",
                    "Reset",
                    () =>
                        editor.chain().focus().unsetAllMarks().setParagraph().run(),
                    () => false,
                    "Clear formatting",
                    HiArrowPath
                ),
            ],
        ];
    }, [editor]);

    const currentText = editor?.getText() ?? "";
    const wordCount = useMemo(() => {
        const trimmed = currentText.trim();
        return trimmed ? trimmed.split(/\s+/).length : 0;
    }, [currentText]);

const baseButtonClass =
  "flex h-7 w-7 items-center justify-center rounded-md border border-transparent bg-white text-slate-500 transition hover:bg-slate-100 focus:outline-none";

    const getButtonClass = (active) =>
        `${baseButtonClass} ${active
            ? "!border-gray-300 !bg-gray-200 !text-black shadow"
            : "border-transparent bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900"
        }`;

    return (
        <div
            className="rounded border border-slate-200 bg-white transition focus-within:border-gray-400"
        >
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 bg-gray-50 px-4 py-2">
                {toolbarGroups.map((group, groupIndex) => (
                    <div className="flex items-center gap-2" key={`group-${groupIndex}`}>
                        {group.map((action) => {
                            const Icon = action.Icon;
                            return (
                                <button
                                    key={action.id}
                                    type="button"
                                    title={action.title}
                                    className={`${getButtonClass(action.isActive())} cursor-pointer`}
                                    onClick={action.handler}
                                    aria-pressed={action.isActive()}
                                    disabled={!editor}
                                >
                                    {Icon ? (
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                        <span className="text-[11px] font-semibold">
                                            {action.label}
                                        </span>
                                    )}
                                    <span className="sr-only">{action.label}</span>
                                </button>
                            );
                        })}
                        {groupIndex < toolbarGroups.length - 1 && (
                            <span
                                className="block h-6 w-px bg-slate-200"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className="px-4 py-4">
                <EditorContent
                    editor={editor}
                    className="max-h-[110px] overflow-y-auto text-sm leading-relaxed text-slate-800 focus:outline-none outline-none
                    [&_ul]:list-disc [&_ul]:pl-6
                    [&_ol]:list-decimal [&_ol]:pl-6
                    [&_li]:my-1"
                />


            </div>

        </div>
    );
};

export default RichTextEditor;
