import * as React from 'react';
import { SVGProps } from 'react';
import { useTheme } from '@mui/material/styles';

const Logo = (props: SVGProps<SVGSVGElement>) => {
    const theme = useTheme();

    return (
        <svg
            width={234.532}
            viewBox="0 0 197.03999 33.119999"
            {...props}
            style={{
                fill: theme.palette.mode === 'dark' ? '#fff' : '#1E1CC8',
            }}
            version="1.1"
            id="svg65"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs id="defs35">
                <g id="g33">
                    <g id="glyph-0-0" />
                    <g id="glyph-0-1">
                        <path
                            d="M 9.8125 -10.9375 L 9.8125 -1.4375 C 10.5625 -1.550781 11.253906 -1.648438 11.890625 -1.734375 C 12.148438 -1.773438 12.414063 -1.8125 12.6875 -1.84375 C 12.957031 -1.875 13.207031 -1.90625 13.4375 -1.9375 C 13.664063 -1.96875 13.859375 -1.988281 14.015625 -2 C 14.179688 -2.019531 14.296875 -2.03125 14.359375 -2.03125 C 14.492188 -2.03125 14.609375 -2.003906 14.703125 -1.953125 C 14.796875 -1.910156 14.84375 -1.8125 14.84375 -1.65625 L 14.84375 -0.578125 C 14.84375 -0.429688 14.804688 -0.296875 14.734375 -0.171875 C 14.660156 -0.0546875 14.492188 0 14.234375 0 L 2.859375 0 C 2.492188 0 2.191406 -0.03125 1.953125 -0.09375 C 1.722656 -0.164063 1.539063 -0.269531 1.40625 -0.40625 C 1.28125 -0.539063 1.191406 -0.707031 1.140625 -0.90625 C 1.097656 -1.113281 1.078125 -1.351563 1.078125 -1.625 L 1.078125 -14.765625 C 1.078125 -15.210938 1.125 -15.570313 1.21875 -15.84375 C 1.320313 -16.113281 1.46875 -16.316406 1.65625 -16.453125 C 1.84375 -16.597656 2.066406 -16.691406 2.328125 -16.734375 C 2.597656 -16.785156 2.890625 -16.8125 3.203125 -16.8125 L 13.78125 -16.8125 C 14.050781 -16.8125 14.222656 -16.75 14.296875 -16.625 C 14.367188 -16.5 14.40625 -16.363281 14.40625 -16.21875 L 14.40625 -15.390625 C 14.40625 -15.234375 14.363281 -15.128906 14.28125 -15.078125 C 14.195313 -15.023438 14.09375 -15 13.96875 -15 C 13.882813 -15 13.757813 -15.003906 13.59375 -15.015625 C 13.4375 -15.035156 13.253906 -15.054688 13.046875 -15.078125 C 12.835938 -15.109375 12.609375 -15.140625 12.359375 -15.171875 C 12.117188 -15.203125 11.878906 -15.238281 11.640625 -15.28125 C 11.078125 -15.363281 10.46875 -15.460938 9.8125 -15.578125 L 9.8125 -12.609375 L 14.15625 -12.609375 C 14.320313 -12.609375 14.40625 -12.523438 14.40625 -12.359375 L 14.40625 -11.1875 C 14.40625 -11.019531 14.320313 -10.9375 14.15625 -10.9375 Z M 8.8125 -15.734375 L 7.90625 -15.875 L 7.90625 -1.1875 L 8.8125 -1.296875 Z M 8.8125 -15.734375 "
                            id="path3"
                        />
                    </g>
                    <g id="glyph-0-2">
                        <path
                            d="M 9.125 -5.921875 C 9.125 -5.128906 9.207031 -4.472656 9.375 -3.953125 C 9.539063 -3.429688 9.753906 -3.015625 10.015625 -2.703125 C 10.273438 -2.398438 10.550781 -2.1875 10.84375 -2.0625 C 11.144531 -1.9375 11.425781 -1.875 11.6875 -1.875 C 11.875 -1.875 12.050781 -1.898438 12.21875 -1.953125 C 12.382813 -2.003906 12.53125 -2.0625 12.65625 -2.125 C 12.78125 -2.1875 12.882813 -2.242188 12.96875 -2.296875 C 13.050781 -2.347656 13.117188 -2.375 13.171875 -2.375 C 13.234375 -2.375 13.28125 -2.363281 13.3125 -2.34375 C 13.34375 -2.320313 13.375 -2.28125 13.40625 -2.21875 L 13.828125 -1.578125 C 13.859375 -1.515625 13.875 -1.460938 13.875 -1.421875 C 13.875 -1.359375 13.859375 -1.3125 13.828125 -1.28125 C 13.796875 -1.25 13.765625 -1.222656 13.734375 -1.203125 C 13.484375 -1.023438 13.171875 -0.835938 12.796875 -0.640625 C 12.421875 -0.441406 11.984375 -0.257813 11.484375 -0.09375 C 10.992188 0.0703125 10.441406 0.207031 9.828125 0.3125 C 9.222656 0.425781 8.5625 0.484375 7.84375 0.484375 C 7.257813 0.484375 6.671875 0.4375 6.078125 0.34375 C 5.492188 0.25 4.9375 0.0976563 4.40625 -0.109375 C 3.875 -0.328125 3.375 -0.597656 2.90625 -0.921875 C 2.445313 -1.253906 2.046875 -1.65625 1.703125 -2.125 C 1.367188 -2.601563 1.101563 -3.15625 0.90625 -3.78125 C 0.71875 -4.414063 0.625 -5.128906 0.625 -5.921875 C 0.625 -6.710938 0.71875 -7.421875 0.90625 -8.046875 C 1.101563 -8.679688 1.367188 -9.234375 1.703125 -9.703125 C 2.046875 -10.179688 2.445313 -10.582031 2.90625 -10.90625 C 3.375 -11.238281 3.875 -11.507813 4.40625 -11.71875 C 4.9375 -11.9375 5.492188 -12.09375 6.078125 -12.1875 C 6.671875 -12.28125 7.257813 -12.328125 7.84375 -12.328125 C 8.476563 -12.328125 9.09375 -12.273438 9.6875 -12.171875 C 10.28125 -12.078125 10.828125 -11.945313 11.328125 -11.78125 C 11.835938 -11.625 12.289063 -11.453125 12.6875 -11.265625 C 13.09375 -11.078125 13.421875 -10.890625 13.671875 -10.703125 C 13.703125 -10.671875 13.734375 -10.640625 13.765625 -10.609375 C 13.796875 -10.578125 13.8125 -10.535156 13.8125 -10.484375 C 13.8125 -10.429688 13.789063 -10.378906 13.75 -10.328125 L 13.34375 -9.6875 C 13.300781 -9.625 13.265625 -9.582031 13.234375 -9.5625 C 13.210938 -9.539063 13.164063 -9.53125 13.09375 -9.53125 C 13.050781 -9.53125 12.988281 -9.550781 12.90625 -9.59375 C 12.832031 -9.644531 12.734375 -9.695313 12.609375 -9.75 C 12.492188 -9.8125 12.359375 -9.867188 12.203125 -9.921875 C 12.046875 -9.972656 11.875 -10 11.6875 -10 C 11.425781 -10 11.144531 -9.929688 10.84375 -9.796875 C 10.550781 -9.671875 10.273438 -9.453125 10.015625 -9.140625 C 9.753906 -8.828125 9.539063 -8.410156 9.375 -7.890625 C 9.207031 -7.367188 9.125 -6.710938 9.125 -5.921875 Z M 10.6875 -1.40625 C 10.4375 -1.457031 10.160156 -1.570313 9.859375 -1.75 C 9.566406 -1.9375 9.289063 -2.207031 9.03125 -2.5625 C 8.78125 -2.914063 8.566406 -3.363281 8.390625 -3.90625 C 8.222656 -4.457031 8.140625 -5.128906 8.140625 -5.921875 C 8.140625 -6.710938 8.222656 -7.382813 8.390625 -7.9375 C 8.566406 -8.488281 8.78125 -8.941406 9.03125 -9.296875 C 9.289063 -9.648438 9.566406 -9.914063 9.859375 -10.09375 C 10.160156 -10.28125 10.4375 -10.40625 10.6875 -10.46875 C 10.257813 -10.457031 9.835938 -10.367188 9.421875 -10.203125 C 9.003906 -10.035156 8.628906 -9.769531 8.296875 -9.40625 C 7.960938 -9.050781 7.691406 -8.585938 7.484375 -8.015625 C 7.273438 -7.441406 7.171875 -6.742188 7.171875 -5.921875 C 7.171875 -5.097656 7.273438 -4.398438 7.484375 -3.828125 C 7.691406 -3.265625 7.960938 -2.800781 8.296875 -2.4375 C 8.628906 -2.082031 9.003906 -1.820313 9.421875 -1.65625 C 9.835938 -1.5 10.257813 -1.414063 10.6875 -1.40625 Z M 10.6875 -1.40625 "
                            id="path6"
                        />
                    </g>
                    <g id="glyph-0-3">
                        <path
                            d="M 9.703125 -11.765625 C 9.867188 -11.898438 10.070313 -12.007813 10.3125 -12.09375 C 10.5625 -12.175781 10.832031 -12.21875 11.125 -12.21875 C 11.863281 -12.21875 12.441406 -11.957031 12.859375 -11.4375 C 13.285156 -10.925781 13.5 -10.171875 13.5 -9.171875 L 13.5 -0.546875 C 13.5 -0.410156 13.476563 -0.304688 13.4375 -0.234375 C 13.40625 -0.160156 13.363281 -0.101563 13.3125 -0.0625 C 13.257813 -0.03125 13.195313 -0.0078125 13.125 0 C 13.0625 0 12.992188 0 12.921875 0 L 12.171875 0 C 11.972656 0 11.84375 -0.0546875 11.78125 -0.171875 C 11.71875 -0.285156 11.6875 -0.410156 11.6875 -0.546875 L 11.6875 -9.296875 C 11.6875 -9.734375 11.609375 -10.066406 11.453125 -10.296875 C 11.296875 -10.535156 11.039063 -10.65625 10.6875 -10.65625 C 10.507813 -10.65625 10.328125 -10.609375 10.140625 -10.515625 C 9.953125 -10.421875 9.804688 -10.316406 9.703125 -10.203125 L 9.703125 -1.640625 C 9.703125 -1.367188 9.6875 -1.128906 9.65625 -0.921875 C 9.625 -0.722656 9.546875 -0.550781 9.421875 -0.40625 C 9.304688 -0.269531 9.140625 -0.164063 8.921875 -0.09375 C 8.710938 -0.03125 8.421875 0 8.046875 0 L 2.625 0 C 2.320313 0 2.066406 -0.03125 1.859375 -0.09375 C 1.660156 -0.164063 1.503906 -0.269531 1.390625 -0.40625 C 1.273438 -0.539063 1.191406 -0.707031 1.140625 -0.90625 C 1.097656 -1.113281 1.078125 -1.351563 1.078125 -1.625 L 1.078125 -17.546875 C 1.078125 -17.804688 1.097656 -18.039063 1.140625 -18.25 C 1.191406 -18.457031 1.28125 -18.625 1.40625 -18.75 C 1.539063 -18.882813 1.722656 -18.988281 1.953125 -19.0625 C 2.191406 -19.132813 2.5 -19.171875 2.875 -19.171875 L 8 -19.171875 C 8.351563 -19.171875 8.640625 -19.140625 8.859375 -19.078125 C 9.085938 -19.015625 9.265625 -18.914063 9.390625 -18.78125 C 9.515625 -18.644531 9.597656 -18.472656 9.640625 -18.265625 C 9.679688 -18.066406 9.703125 -17.828125 9.703125 -17.546875 Z M 8.703125 -17.4375 C 8.703125 -17.613281 8.691406 -17.75 8.671875 -17.84375 C 8.648438 -17.945313 8.601563 -18.023438 8.53125 -18.078125 C 8.457031 -18.128906 8.363281 -18.160156 8.25 -18.171875 C 8.132813 -18.179688 7.984375 -18.1875 7.796875 -18.1875 L 7.796875 -0.984375 C 7.984375 -0.984375 8.132813 -0.988281 8.25 -1 C 8.363281 -1.007813 8.457031 -1.039063 8.53125 -1.09375 C 8.601563 -1.144531 8.648438 -1.21875 8.671875 -1.3125 C 8.691406 -1.414063 8.703125 -1.554688 8.703125 -1.734375 Z M 8.703125 -17.4375 "
                            id="path9"
                        />
                    </g>
                    <g id="glyph-0-4">
                        <path
                            d="M 0.25 -8.140625 C 0.0820313 -8.140625 0 -8.226563 0 -8.40625 L 0 -9.34375 C 0 -9.5 0.0820313 -9.578125 0.25 -9.578125 L 1.46875 -9.578125 L 1.46875 -12.234375 C 1.46875 -12.359375 1.484375 -12.476563 1.515625 -12.59375 C 1.546875 -12.707031 1.640625 -12.796875 1.796875 -12.859375 L 8.265625 -15.25 C 8.554688 -15.351563 8.800781 -15.429688 9 -15.484375 C 9.195313 -15.546875 9.367188 -15.578125 9.515625 -15.578125 C 9.566406 -15.578125 9.625 -15.566406 9.6875 -15.546875 C 9.757813 -15.523438 9.820313 -15.488281 9.875 -15.4375 C 9.9375 -15.394531 9.988281 -15.332031 10.03125 -15.25 C 10.070313 -15.164063 10.09375 -15.066406 10.09375 -14.953125 L 10.09375 -9.578125 L 12.1875 -9.578125 C 12.351563 -9.578125 12.4375 -9.5 12.4375 -9.34375 L 12.4375 -8.40625 C 12.4375 -8.226563 12.351563 -8.140625 12.1875 -8.140625 L 10.09375 -8.140625 L 10.09375 -3.421875 C 10.09375 -2.867188 10.179688 -2.476563 10.359375 -2.25 C 10.546875 -2.03125 10.832031 -1.921875 11.21875 -1.921875 C 11.300781 -1.921875 11.390625 -1.929688 11.484375 -1.953125 C 11.578125 -1.972656 11.664063 -1.988281 11.75 -2 C 11.832031 -2.019531 11.90625 -2.039063 11.96875 -2.0625 C 12.039063 -2.082031 12.097656 -2.09375 12.140625 -2.09375 C 12.234375 -2.09375 12.28125 -2.039063 12.28125 -1.9375 L 12.28125 -1.046875 C 12.28125 -0.890625 12.25 -0.78125 12.1875 -0.71875 C 12.125 -0.664063 12.066406 -0.632813 12.015625 -0.625 C 11.722656 -0.5 11.375 -0.375 10.96875 -0.25 C 10.570313 -0.125 10.140625 -0.015625 9.671875 0.078125 C 9.210938 0.179688 8.722656 0.257813 8.203125 0.3125 C 7.691406 0.375 7.175781 0.40625 6.65625 0.40625 C 5.914063 0.40625 5.226563 0.367188 4.59375 0.296875 C 3.957031 0.222656 3.40625 0.0546875 2.9375 -0.203125 C 2.476563 -0.472656 2.117188 -0.867188 1.859375 -1.390625 C 1.597656 -1.910156 1.46875 -2.617188 1.46875 -3.515625 L 1.46875 -8.140625 Z M 9.09375 -13.90625 C 9.09375 -14.0625 9.070313 -14.1875 9.03125 -14.28125 C 9 -14.382813 8.921875 -14.4375 8.796875 -14.4375 C 8.742188 -14.4375 8.679688 -14.425781 8.609375 -14.40625 C 8.535156 -14.394531 8.457031 -14.367188 8.375 -14.328125 L 8.1875 -14.25 L 8.1875 -3.125 C 8.1875 -2.769531 8.242188 -2.484375 8.359375 -2.265625 C 8.472656 -2.046875 8.613281 -1.875 8.78125 -1.75 C 8.957031 -1.625 9.140625 -1.539063 9.328125 -1.5 C 9.523438 -1.457031 9.703125 -1.4375 9.859375 -1.4375 C 9.742188 -1.53125 9.632813 -1.625 9.53125 -1.71875 C 9.4375 -1.820313 9.359375 -1.9375 9.296875 -2.0625 C 9.234375 -2.195313 9.179688 -2.34375 9.140625 -2.5 C 9.109375 -2.65625 9.09375 -2.847656 9.09375 -3.078125 Z M 9.09375 -13.90625 "
                            id="path12"
                        />
                    </g>
                    <g id="glyph-0-5">
                        <path
                            d="M 0.765625 -11.59375 C 0.765625 -11.726563 0.789063 -11.828125 0.84375 -11.890625 C 0.90625 -11.953125 1.023438 -11.984375 1.203125 -11.984375 L 12.515625 -11.984375 C 12.804688 -11.984375 13.007813 -11.945313 13.125 -11.875 C 13.25 -11.8125 13.3125 -11.6875 13.3125 -11.5 C 13.3125 -11.28125 13.238281 -11.046875 13.09375 -10.796875 L 8.421875 -1.65625 C 9.148438 -1.675781 9.816406 -1.695313 10.421875 -1.71875 C 10.671875 -1.726563 10.921875 -1.738281 11.171875 -1.75 C 11.429688 -1.757813 11.671875 -1.769531 11.890625 -1.78125 C 12.109375 -1.789063 12.296875 -1.796875 12.453125 -1.796875 C 12.609375 -1.796875 12.71875 -1.796875 12.78125 -1.796875 C 12.914063 -1.796875 13.039063 -1.769531 13.15625 -1.71875 C 13.269531 -1.675781 13.328125 -1.578125 13.328125 -1.421875 L 13.328125 -0.578125 C 13.328125 -0.429688 13.28125 -0.296875 13.1875 -0.171875 C 13.101563 -0.0546875 12.925781 0 12.65625 0 L 0.90625 0 C 0.675781 0 0.503906 -0.046875 0.390625 -0.140625 C 0.285156 -0.242188 0.234375 -0.359375 0.234375 -0.484375 C 0.234375 -0.640625 0.257813 -0.789063 0.3125 -0.9375 C 0.375 -1.082031 0.472656 -1.28125 0.609375 -1.53125 L 5.15625 -10.34375 C 4.539063 -10.3125 3.972656 -10.285156 3.453125 -10.265625 C 3.222656 -10.242188 2.992188 -10.226563 2.765625 -10.21875 C 2.546875 -10.21875 2.332031 -10.210938 2.125 -10.203125 C 1.914063 -10.191406 1.726563 -10.1875 1.5625 -10.1875 C 1.40625 -10.1875 1.28125 -10.1875 1.1875 -10.1875 C 1.09375 -10.1875 1 -10.207031 0.90625 -10.25 C 0.8125 -10.289063 0.765625 -10.390625 0.765625 -10.546875 Z M 11.78125 -10.390625 C 11.8125 -10.453125 11.832031 -10.507813 11.84375 -10.5625 C 11.863281 -10.625 11.875 -10.679688 11.875 -10.734375 C 11.875 -10.910156 11.75 -11 11.5 -11 L 11.09375 -11 L 6.265625 -1.5625 L 7.28125 -1.609375 Z M 11.78125 -10.390625 "
                            id="path15"
                        />
                    </g>
                    <g id="glyph-0-6">
                        <path
                            d="M 11.6875 -1.9375 C 11.894531 -1.9375 12.082031 -1.96875 12.25 -2.03125 C 12.425781 -2.09375 12.582031 -2.15625 12.71875 -2.21875 C 12.851563 -2.289063 12.960938 -2.351563 13.046875 -2.40625 C 13.140625 -2.46875 13.210938 -2.5 13.265625 -2.5 C 13.328125 -2.5 13.375 -2.488281 13.40625 -2.46875 C 13.4375 -2.445313 13.46875 -2.40625 13.5 -2.34375 L 13.921875 -1.703125 C 13.953125 -1.640625 13.96875 -1.585938 13.96875 -1.546875 C 13.96875 -1.492188 13.953125 -1.453125 13.921875 -1.421875 C 13.890625 -1.390625 13.859375 -1.359375 13.828125 -1.328125 C 13.578125 -1.148438 13.265625 -0.957031 12.890625 -0.75 C 12.515625 -0.539063 12.078125 -0.351563 11.578125 -0.1875 C 11.085938 -0.0195313 10.53125 0.117188 9.90625 0.234375 C 9.28125 0.347656 8.59375 0.40625 7.84375 0.40625 C 7.257813 0.40625 6.671875 0.359375 6.078125 0.265625 C 5.492188 0.171875 4.9375 0.0234375 4.40625 -0.171875 C 3.875 -0.378906 3.375 -0.644531 2.90625 -0.96875 C 2.445313 -1.300781 2.046875 -1.703125 1.703125 -2.171875 C 1.367188 -2.648438 1.101563 -3.203125 0.90625 -3.828125 C 0.71875 -4.460938 0.625 -5.1875 0.625 -6 C 0.625 -6.789063 0.71875 -7.5 0.90625 -8.125 C 1.101563 -8.75 1.367188 -9.300781 1.703125 -9.78125 C 2.046875 -10.257813 2.445313 -10.664063 2.90625 -11 C 3.375 -11.332031 3.875 -11.597656 4.40625 -11.796875 C 4.9375 -12.003906 5.492188 -12.15625 6.078125 -12.25 C 6.671875 -12.34375 7.257813 -12.390625 7.84375 -12.390625 C 8.8125 -12.390625 9.71875 -12.28125 10.5625 -12.0625 C 11.40625 -11.84375 12.132813 -11.484375 12.75 -10.984375 C 13.363281 -10.484375 13.84375 -9.828125 14.1875 -9.015625 C 14.539063 -8.210938 14.71875 -7.21875 14.71875 -6.03125 L 14.71875 -5.390625 C 14.71875 -5.242188 14.679688 -5.128906 14.609375 -5.046875 C 14.546875 -4.972656 14.429688 -4.9375 14.265625 -4.9375 L 9.421875 -4.9375 C 9.484375 -4.363281 9.59375 -3.882813 9.75 -3.5 C 9.914063 -3.113281 10.097656 -2.800781 10.296875 -2.5625 C 10.503906 -2.332031 10.726563 -2.171875 10.96875 -2.078125 C 11.21875 -1.984375 11.457031 -1.9375 11.6875 -1.9375 Z M 13.0625 -6.375 C 13.0625 -7 13.007813 -7.515625 12.90625 -7.921875 C 12.8125 -8.335938 12.679688 -8.664063 12.515625 -8.90625 C 12.359375 -9.15625 12.164063 -9.328125 11.9375 -9.421875 C 11.71875 -9.523438 11.488281 -9.578125 11.25 -9.578125 C 11.070313 -9.578125 10.875 -9.539063 10.65625 -9.46875 C 10.445313 -9.40625 10.25 -9.257813 10.0625 -9.03125 C 9.882813 -8.8125 9.726563 -8.488281 9.59375 -8.0625 C 9.46875 -7.644531 9.394531 -7.082031 9.375 -6.375 Z M 10.90625 -1.28125 C 10.65625 -1.34375 10.378906 -1.457031 10.078125 -1.625 C 9.785156 -1.789063 9.507813 -2.046875 9.25 -2.390625 C 9 -2.742188 8.785156 -3.207031 8.609375 -3.78125 C 8.441406 -4.351563 8.359375 -5.066406 8.359375 -5.921875 C 8.359375 -6.710938 8.429688 -7.378906 8.578125 -7.921875 C 8.734375 -8.472656 8.929688 -8.921875 9.171875 -9.265625 C 9.410156 -9.617188 9.679688 -9.882813 9.984375 -10.0625 C 10.296875 -10.238281 10.601563 -10.347656 10.90625 -10.390625 C 10.4375 -10.378906 9.988281 -10.285156 9.5625 -10.109375 C 9.144531 -9.941406 8.769531 -9.679688 8.4375 -9.328125 C 8.113281 -8.972656 7.859375 -8.515625 7.671875 -7.953125 C 7.484375 -7.390625 7.390625 -6.710938 7.390625 -5.921875 C 7.390625 -5.078125 7.5 -4.359375 7.71875 -3.765625 C 7.9375 -3.179688 8.210938 -2.703125 8.546875 -2.328125 C 8.890625 -1.960938 9.269531 -1.695313 9.6875 -1.53125 C 10.101563 -1.363281 10.507813 -1.28125 10.90625 -1.28125 Z M 10.90625 -1.28125 "
                            id="path18"
                        />
                    </g>
                    <g id="glyph-0-7">
                        <path
                            d="M 1.078125 -10.359375 C 1.078125 -10.617188 1.097656 -10.851563 1.140625 -11.0625 C 1.191406 -11.269531 1.28125 -11.441406 1.40625 -11.578125 C 1.539063 -11.710938 1.722656 -11.8125 1.953125 -11.875 C 2.191406 -11.945313 2.5 -11.984375 2.875 -11.984375 L 8 -11.984375 C 8.363281 -11.984375 8.65625 -11.945313 8.875 -11.875 C 9.09375 -11.8125 9.265625 -11.710938 9.390625 -11.578125 C 9.515625 -11.453125 9.597656 -11.285156 9.640625 -11.078125 C 9.679688 -10.878906 9.703125 -10.640625 9.703125 -10.359375 L 9.703125 -1.609375 C 9.703125 -1.335938 9.679688 -1.101563 9.640625 -0.90625 C 9.597656 -0.707031 9.515625 -0.539063 9.390625 -0.40625 C 9.265625 -0.269531 9.09375 -0.164063 8.875 -0.09375 C 8.65625 -0.03125 8.363281 0 8 0 L 2.875 0 C 2.5 0 2.191406 -0.03125 1.953125 -0.09375 C 1.722656 -0.164063 1.539063 -0.269531 1.40625 -0.40625 C 1.28125 -0.539063 1.191406 -0.707031 1.140625 -0.90625 C 1.097656 -1.113281 1.078125 -1.351563 1.078125 -1.625 Z M 1.515625 -17 C 1.515625 -17.53125 1.613281 -18.035156 1.8125 -18.515625 C 2.019531 -18.992188 2.300781 -19.40625 2.65625 -19.75 C 3.007813 -20.101563 3.421875 -20.382813 3.890625 -20.59375 C 4.367188 -20.800781 4.878906 -20.90625 5.421875 -20.90625 C 5.953125 -20.90625 6.453125 -20.800781 6.921875 -20.59375 C 7.390625 -20.382813 7.800781 -20.101563 8.15625 -19.75 C 8.507813 -19.40625 8.785156 -18.992188 8.984375 -18.515625 C 9.191406 -18.035156 9.296875 -17.53125 9.296875 -17 C 9.296875 -16.46875 9.191406 -15.960938 8.984375 -15.484375 C 8.785156 -15.015625 8.507813 -14.601563 8.15625 -14.25 C 7.800781 -13.90625 7.390625 -13.628906 6.921875 -13.421875 C 6.453125 -13.210938 5.953125 -13.109375 5.421875 -13.109375 C 4.878906 -13.109375 4.367188 -13.210938 3.890625 -13.421875 C 3.421875 -13.628906 3.007813 -13.90625 2.65625 -14.25 C 2.300781 -14.601563 2.019531 -15.015625 1.8125 -15.484375 C 1.613281 -15.960938 1.515625 -16.46875 1.515625 -17 Z M 8.703125 -10.25 C 8.703125 -10.425781 8.691406 -10.5625 8.671875 -10.65625 C 8.648438 -10.757813 8.601563 -10.835938 8.53125 -10.890625 C 8.457031 -10.941406 8.363281 -10.972656 8.25 -10.984375 C 8.132813 -10.992188 7.984375 -11 7.796875 -11 L 7.796875 -0.984375 C 7.984375 -0.984375 8.132813 -0.988281 8.25 -1 C 8.363281 -1.007813 8.457031 -1.039063 8.53125 -1.09375 C 8.601563 -1.144531 8.648438 -1.21875 8.671875 -1.3125 C 8.691406 -1.414063 8.703125 -1.554688 8.703125 -1.734375 Z M 7.34375 -17 C 7.34375 -16.445313 7.234375 -15.925781 7.015625 -15.4375 C 6.804688 -14.957031 6.519531 -14.539063 6.15625 -14.1875 C 6.46875 -14.257813 6.753906 -14.382813 7.015625 -14.5625 C 7.273438 -14.75 7.5 -14.960938 7.6875 -15.203125 C 7.882813 -15.453125 8.035156 -15.726563 8.140625 -16.03125 C 8.253906 -16.332031 8.3125 -16.65625 8.3125 -17 C 8.3125 -17.332031 8.253906 -17.648438 8.140625 -17.953125 C 8.035156 -18.253906 7.882813 -18.523438 7.6875 -18.765625 C 7.5 -19.015625 7.273438 -19.226563 7.015625 -19.40625 C 6.753906 -19.582031 6.46875 -19.710938 6.15625 -19.796875 C 6.519531 -19.441406 6.804688 -19.019531 7.015625 -18.53125 C 7.234375 -18.050781 7.34375 -17.539063 7.34375 -17 Z M 7.34375 -17 "
                            id="path21"
                        />
                    </g>
                    <g id="glyph-0-8">
                        <path
                            d="M 1.078125 -17.546875 C 1.078125 -17.804688 1.097656 -18.039063 1.140625 -18.25 C 1.191406 -18.457031 1.28125 -18.625 1.40625 -18.75 C 1.539063 -18.882813 1.722656 -18.988281 1.953125 -19.0625 C 2.191406 -19.132813 2.5 -19.171875 2.875 -19.171875 L 8 -19.171875 C 8.363281 -19.171875 8.65625 -19.132813 8.875 -19.0625 C 9.09375 -18.988281 9.265625 -18.882813 9.390625 -18.75 C 9.515625 -18.625 9.597656 -18.457031 9.640625 -18.25 C 9.679688 -18.039063 9.703125 -17.804688 9.703125 -17.546875 L 9.703125 -9.09375 L 12.515625 -11.875 C 12.597656 -11.957031 12.675781 -12.015625 12.75 -12.046875 C 12.832031 -12.085938 12.90625 -12.109375 12.96875 -12.109375 C 13.101563 -12.109375 13.222656 -12.050781 13.328125 -11.9375 L 13.921875 -11.328125 C 14.003906 -11.222656 14.046875 -11.125 14.046875 -11.03125 C 14.046875 -10.945313 14.015625 -10.863281 13.953125 -10.78125 C 13.898438 -10.695313 13.804688 -10.601563 13.671875 -10.5 L 10 -7.796875 C 10.65625 -7.773438 11.203125 -7.691406 11.640625 -7.546875 C 12.085938 -7.398438 12.445313 -7.1875 12.71875 -6.90625 C 12.988281 -6.632813 13.1875 -6.296875 13.3125 -5.890625 C 13.4375 -5.492188 13.5 -5.023438 13.5 -4.484375 L 13.5 -0.546875 C 13.5 -0.410156 13.476563 -0.304688 13.4375 -0.234375 C 13.40625 -0.160156 13.363281 -0.101563 13.3125 -0.0625 C 13.257813 -0.03125 13.195313 -0.0078125 13.125 0 C 13.0625 0 12.992188 0 12.921875 0 L 12.171875 0 C 11.972656 0 11.84375 -0.0546875 11.78125 -0.171875 C 11.71875 -0.285156 11.6875 -0.410156 11.6875 -0.546875 L 11.6875 -4.59375 C 11.6875 -4.957031 11.65625 -5.257813 11.59375 -5.5 C 11.53125 -5.738281 11.421875 -5.925781 11.265625 -6.0625 C 11.109375 -6.207031 10.898438 -6.3125 10.640625 -6.375 C 10.390625 -6.445313 10.078125 -6.488281 9.703125 -6.5 L 9.703125 -1.609375 C 9.703125 -1.335938 9.675781 -1.101563 9.625 -0.90625 C 9.570313 -0.707031 9.472656 -0.539063 9.328125 -0.40625 C 9.191406 -0.269531 9 -0.164063 8.75 -0.09375 C 8.5 -0.03125 8.179688 0 7.796875 0 L 2.875 0 C 2.5 0 2.191406 -0.03125 1.953125 -0.09375 C 1.722656 -0.164063 1.539063 -0.269531 1.40625 -0.40625 C 1.28125 -0.539063 1.191406 -0.707031 1.140625 -0.90625 C 1.097656 -1.113281 1.078125 -1.351563 1.078125 -1.625 Z M 8.703125 -17.4375 C 8.703125 -17.613281 8.691406 -17.75 8.671875 -17.84375 C 8.648438 -17.945313 8.601563 -18.023438 8.53125 -18.078125 C 8.457031 -18.128906 8.363281 -18.160156 8.25 -18.171875 C 8.132813 -18.179688 7.984375 -18.1875 7.796875 -18.1875 L 7.796875 -0.984375 C 7.984375 -0.984375 8.132813 -0.988281 8.25 -1 C 8.363281 -1.007813 8.457031 -1.039063 8.53125 -1.09375 C 8.601563 -1.144531 8.648438 -1.21875 8.671875 -1.3125 C 8.691406 -1.414063 8.703125 -1.554688 8.703125 -1.734375 Z M 8.703125 -17.4375 "
                            id="path24"
                        />
                    </g>
                    <g id="glyph-0-9">
                        <path
                            d="M 7.84375 0.40625 C 7.257813 0.40625 6.671875 0.359375 6.078125 0.265625 C 5.492188 0.171875 4.9375 0.0234375 4.40625 -0.171875 C 3.875 -0.378906 3.375 -0.644531 2.90625 -0.96875 C 2.445313 -1.300781 2.046875 -1.703125 1.703125 -2.171875 C 1.367188 -2.648438 1.101563 -3.203125 0.90625 -3.828125 C 0.71875 -4.460938 0.625 -5.1875 0.625 -6 C 0.625 -6.789063 0.71875 -7.5 0.90625 -8.125 C 1.101563 -8.75 1.367188 -9.300781 1.703125 -9.78125 C 2.046875 -10.257813 2.445313 -10.664063 2.90625 -11 C 3.375 -11.332031 3.875 -11.597656 4.40625 -11.796875 C 4.9375 -12.003906 5.492188 -12.15625 6.078125 -12.25 C 6.671875 -12.34375 7.257813 -12.390625 7.84375 -12.390625 C 8.382813 -12.390625 8.9375 -12.351563 9.5 -12.28125 C 10.0625 -12.21875 10.609375 -12.097656 11.140625 -11.921875 C 11.679688 -11.753906 12.1875 -11.519531 12.65625 -11.21875 C 13.125 -10.914063 13.535156 -10.53125 13.890625 -10.0625 C 14.253906 -9.59375 14.535156 -9.03125 14.734375 -8.375 C 14.941406 -7.726563 15.046875 -6.960938 15.046875 -6.078125 C 15.046875 -5.179688 14.941406 -4.394531 14.734375 -3.71875 C 14.535156 -3.039063 14.257813 -2.460938 13.90625 -1.984375 C 13.550781 -1.503906 13.140625 -1.109375 12.671875 -0.796875 C 12.203125 -0.484375 11.703125 -0.238281 11.171875 -0.0625 C 10.640625 0.113281 10.085938 0.234375 9.515625 0.296875 C 8.941406 0.367188 8.382813 0.40625 7.84375 0.40625 Z M 11.4375 -2.40625 C 11.675781 -2.40625 11.914063 -2.457031 12.15625 -2.5625 C 12.394531 -2.664063 12.601563 -2.851563 12.78125 -3.125 C 12.96875 -3.394531 13.117188 -3.769531 13.234375 -4.25 C 13.347656 -4.726563 13.40625 -5.335938 13.40625 -6.078125 C 13.40625 -6.785156 13.347656 -7.363281 13.234375 -7.8125 C 13.117188 -8.269531 12.96875 -8.628906 12.78125 -8.890625 C 12.59375 -9.148438 12.378906 -9.328125 12.140625 -9.421875 C 11.910156 -9.523438 11.675781 -9.578125 11.4375 -9.578125 C 11.25 -9.578125 11.039063 -9.535156 10.8125 -9.453125 C 10.582031 -9.378906 10.363281 -9.21875 10.15625 -8.96875 C 9.957031 -8.71875 9.789063 -8.351563 9.65625 -7.875 C 9.53125 -7.40625 9.46875 -6.78125 9.46875 -6 C 9.46875 -5.207031 9.519531 -4.570313 9.625 -4.09375 C 9.738281 -3.613281 9.882813 -3.25 10.0625 -3 C 10.238281 -2.757813 10.445313 -2.597656 10.6875 -2.515625 C 10.925781 -2.441406 11.175781 -2.40625 11.4375 -2.40625 Z M 10.5625 -1.9375 C 10.300781 -1.976563 10.046875 -2.066406 9.796875 -2.203125 C 9.546875 -2.335938 9.320313 -2.550781 9.125 -2.84375 C 8.9375 -3.144531 8.78125 -3.546875 8.65625 -4.046875 C 8.53125 -4.554688 8.46875 -5.207031 8.46875 -6 C 8.46875 -6.519531 8.5 -6.976563 8.5625 -7.375 C 8.632813 -7.769531 8.726563 -8.113281 8.84375 -8.40625 C 8.957031 -8.695313 9.085938 -8.9375 9.234375 -9.125 C 9.378906 -9.320313 9.523438 -9.484375 9.671875 -9.609375 C 9.828125 -9.742188 9.984375 -9.84375 10.140625 -9.90625 C 10.296875 -9.96875 10.4375 -10.015625 10.5625 -10.046875 C 10.28125 -10.046875 9.960938 -9.984375 9.609375 -9.859375 C 9.265625 -9.742188 8.9375 -9.535156 8.625 -9.234375 C 8.3125 -8.929688 8.046875 -8.515625 7.828125 -7.984375 C 7.617188 -7.460938 7.515625 -6.800781 7.515625 -6 C 7.515625 -5.1875 7.609375 -4.515625 7.796875 -3.984375 C 7.984375 -3.460938 8.222656 -3.050781 8.515625 -2.75 C 8.804688 -2.445313 9.132813 -2.234375 9.5 -2.109375 C 9.863281 -1.992188 10.21875 -1.9375 10.5625 -1.9375 Z M 10.5625 -1.9375 "
                            id="path27"
                        />
                    </g>
                    <g id="glyph-0-10">
                        <path
                            d="M 9.421875 -12.390625 C 9.921875 -12.390625 10.421875 -12.359375 10.921875 -12.296875 C 11.421875 -12.242188 11.894531 -12.171875 12.34375 -12.078125 C 12.789063 -11.984375 13.195313 -11.878906 13.5625 -11.765625 C 13.9375 -11.648438 14.242188 -11.539063 14.484375 -11.4375 C 14.515625 -11.414063 14.550781 -11.390625 14.59375 -11.359375 C 14.644531 -11.328125 14.671875 -11.269531 14.671875 -11.1875 C 14.671875 -11.164063 14.664063 -11.132813 14.65625 -11.09375 C 14.644531 -11.050781 14.632813 -11.015625 14.625 -10.984375 L 14.484375 -10.28125 C 14.472656 -10.1875 14.453125 -10.128906 14.421875 -10.109375 C 14.398438 -10.097656 14.375 -10.09375 14.34375 -10.09375 C 14.3125 -10.09375 14.238281 -10.101563 14.125 -10.125 C 14.019531 -10.144531 13.90625 -10.15625 13.78125 -10.15625 C 13.332031 -10.15625 12.976563 -10.035156 12.71875 -9.796875 C 12.457031 -9.554688 12.296875 -9.144531 12.234375 -8.5625 L 11.578125 -3.09375 C 11.515625 -2.601563 11.351563 -2.144531 11.09375 -1.71875 C 10.832031 -1.300781 10.453125 -0.929688 9.953125 -0.609375 C 9.460938 -0.296875 8.859375 -0.0507813 8.140625 0.125 C 7.421875 0.3125 6.578125 0.40625 5.609375 0.40625 C 4.992188 0.40625 4.398438 0.367188 3.828125 0.296875 C 3.253906 0.222656 2.722656 0.132813 2.234375 0.03125 C 1.742188 -0.0703125 1.316406 -0.175781 0.953125 -0.28125 C 0.585938 -0.382813 0.316406 -0.46875 0.140625 -0.53125 C 0.078125 -0.550781 0.03125 -0.570313 0 -0.59375 C -0.0390625 -0.625 -0.0625 -0.671875 -0.0625 -0.734375 C -0.0625 -0.765625 -0.0546875 -0.800781 -0.046875 -0.84375 C -0.0351563 -0.882813 -0.0234375 -0.929688 -0.015625 -0.984375 L 0.125 -1.640625 C 0.144531 -1.703125 0.171875 -1.75 0.203125 -1.78125 C 0.242188 -1.820313 0.316406 -1.84375 0.421875 -1.84375 C 0.679688 -1.84375 0.941406 -1.859375 1.203125 -1.890625 C 1.460938 -1.921875 1.703125 -1.992188 1.921875 -2.109375 C 2.148438 -2.222656 2.347656 -2.398438 2.515625 -2.640625 C 2.679688 -2.878906 2.796875 -3.21875 2.859375 -3.65625 L 3.671875 -9.296875 C 3.753906 -9.890625 3.972656 -10.382813 4.328125 -10.78125 C 4.679688 -11.1875 5.113281 -11.503906 5.625 -11.734375 C 6.144531 -11.972656 6.734375 -12.140625 7.390625 -12.234375 C 8.046875 -12.335938 8.722656 -12.390625 9.421875 -12.390625 Z M 7.203125 -0.671875 C 8.273438 -0.796875 9.085938 -1.097656 9.640625 -1.578125 C 10.203125 -2.066406 10.523438 -2.664063 10.609375 -3.375 L 11.234375 -8.5625 C 11.304688 -9.144531 11.476563 -9.628906 11.75 -10.015625 C 12.03125 -10.410156 12.410156 -10.65625 12.890625 -10.75 C 12.453125 -10.75 12.078125 -10.6875 11.765625 -10.5625 C 11.460938 -10.445313 11.207031 -10.289063 11 -10.09375 C 10.789063 -9.894531 10.628906 -9.660156 10.515625 -9.390625 C 10.398438 -9.128906 10.328125 -8.851563 10.296875 -8.5625 L 9.671875 -3.375 C 9.640625 -3.070313 9.5625 -2.78125 9.4375 -2.5 C 9.3125 -2.21875 9.148438 -1.957031 8.953125 -1.71875 C 8.753906 -1.488281 8.503906 -1.28125 8.203125 -1.09375 C 7.910156 -0.90625 7.578125 -0.765625 7.203125 -0.671875 Z M 7.203125 -0.671875 "
                            id="path30"
                        />
                    </g>
                </g>
            </defs>
            <g
                style={{
                    fill: theme.palette.mode === 'dark' ? '#fff' : '#1E1CC8',
                    fillOpacity: 1,
                }}
                id="g63"
            >
                <use
                    xlinkHref="#glyph-0-1"
                    x="8.7779217"
                    y="24.71863"
                    id="use37"
                />
                <use
                    xlinkHref="#glyph-0-2"
                    x="24.098324"
                    y="24.71863"
                    id="use39"
                />
                <use
                    xlinkHref="#glyph-0-3"
                    x="38.213223"
                    y="24.71863"
                    id="use41"
                />
                <use
                    xlinkHref="#glyph-0-4"
                    x="52.784573"
                    y="24.71863"
                    id="use43"
                />
                <use
                    xlinkHref="#glyph-0-5"
                    x="65.939751"
                    y="24.71863"
                    id="use45"
                />
                <use
                    xlinkHref="#glyph-0-6"
                    x="79.410934"
                    y="24.71863"
                    id="use47"
                />
                <use
                    xlinkHref="#glyph-0-7"
                    x="94.754745"
                    y="24.71863"
                    id="use49"
                />
                <use
                    xlinkHref="#glyph-0-4"
                    x="105.53403"
                    y="24.71863"
                    id="use51"
                />
                <use
                    xlinkHref="#glyph-0-8"
                    x="118.68922"
                    y="24.71863"
                    id="use53"
                />
                <use
                    xlinkHref="#glyph-0-7"
                    x="132.93286"
                    y="24.71863"
                    id="use55"
                />
                <use
                    xlinkHref="#glyph-0-9"
                    x="143.71214"
                    y="24.71863"
                    id="use57"
                />
                <use
                    xlinkHref="#glyph-0-10"
                    x="159.38367"
                    y="24.71863"
                    id="use59"
                />
                <use
                    xlinkHref="#glyph-0-8"
                    x="173.99013"
                    y="24.71863"
                    id="use61"
                />
            </g>
        </svg>
    );
};

export default Logo;