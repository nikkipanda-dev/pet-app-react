import { Regular } from './Regular';

export const Paragraph = (
    {
        css, 
        color, 
        size, 
        letterSpacing, 
        className, 
        height,
        children 
    }
) => {
  return (
    <Regular 
    css={ css }
    color={ color }
    size={ size }
    letterSpacing={ letterSpacing }
    className={ className }
    height={ height }>
        { children }
    </Regular>
  )
}

export default Paragraph;