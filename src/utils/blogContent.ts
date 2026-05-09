const TEMPLATE_POST_ID_MARKER = 'blog_template'

export const isTemplateBlogPostId = (postId: string): boolean =>
    postId.toLowerCase().includes(TEMPLATE_POST_ID_MARKER)
