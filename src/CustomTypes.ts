export declare type HTMLInputValueTypes = string | number | string[] | undefined;

export declare type HTMLInputTypes = 'button' | 'checkbox' | 'color' | 'date' |
'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' |
'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' |
'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export declare type ATargetAttributes = '_blank' | '_self' | '_parent' | '_top' | 'framename';

export declare interface JSONKeyValueString {
  [key: string]: string;
}

export declare interface LinksList {
  fontawesomeIcon: string;
  url: string;
}

interface TextProps {
  text: string;
}

export declare interface IndexPageTemplateProps {
  title: string;
  subtitles: TextProps[];
  links: LinksList[];
}

export declare interface IndexPageQuery {
  data: {
    markdownRemark: {
      frontmatter: IndexPageTemplateProps;
    };
  };
}

export declare type VoidFunction = () => void;
