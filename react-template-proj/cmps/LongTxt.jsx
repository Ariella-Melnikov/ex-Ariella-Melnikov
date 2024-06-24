const { useState } = React;

export function LongTxt({ txt, length = 100 }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const displayTxt = isExpanded ? txt : txt.slice(0, length);

    return (
        <div className="long-txt">
            <p>
                {displayTxt}
                {!isExpanded && txt.length > length && '... '}
                {txt.length > length && (
                    <span onClick={toggleExpand} style={{ color: 'blue', cursor: 'pointer' }}>
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </span>
                )}
            </p>
        </div>
    );
}