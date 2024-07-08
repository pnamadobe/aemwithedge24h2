window.dataLayer = window.dataLayer || [];
export function headerInteraction(click_text, menu_category, cta_position, page_type) {
    window.dataLayer.push({
        'event': 'header_interaction',
        'click_text': click_text,
        'menu_category': menu_category || click_text,
        'cta_position': cta_position,
        'page_type': page_type
    });
}