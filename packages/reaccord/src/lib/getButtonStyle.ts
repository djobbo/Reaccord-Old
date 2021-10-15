const buttonStyles = {
    Primary: 1,
    Secondary: 2,
    Success: 3,
    Danger: 4,
    Link: 5,
}

export const getButtonStyle = (style: keyof typeof buttonStyles) =>
    buttonStyles[style]