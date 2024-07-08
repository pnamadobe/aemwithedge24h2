window.dataLayer = window.dataLayer || [];
export function headerInteraction(click_text, menu_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'header_interaction',
            'click_text': click_text,
            'menu_category': menu_category || click_text,
            'cta_position': cta_position,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}
export function footerInteraction(click_text, menu_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'footer_interaction',
            'click_text': click_text,
            'menu_category': menu_category || click_text,
            'cta_position': 'footer',
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}

export function outboundClick(click_text, menu_category, cta_position, page_type) {
    try {
        window.dataLayer.push({
            'event': 'outbound_click',
            'click_text': click_text,
            'menu_category': menu_category,
            'cta_position': cta_position,
            'page_type': page_type
        });
    } catch (error) {
        console.warn(error);
    }
}