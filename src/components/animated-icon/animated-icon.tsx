'use client'

import { useRef } from 'react';
import { Player } from '@lordicon/react';
import { IPlayerOptions } from '@lordicon/react/dist/interfaces';

type GraphAnimatedProps = {
    icon: IPlayerOptions['icon'];
    className?: string;
    playerProps?: Partial<IPlayerOptions>;
};

export default function AnimatedIcon({
    icon,
    className = '',
    playerProps = {},
}: GraphAnimatedProps) {
    const playerRef = useRef<Player>(null);

    return (
        <div
            onMouseEnter={() => playerRef.current?.playFromBeginning()}
            className={className}
        >
            <Player
                ref={playerRef}
                icon={icon}
                {...playerProps}
            />
        </div>
    );
}
