/**
 * AsciiLogo Component
 *
 * Displays the "Spellbook" ASCII art logo.
 * Uses a <pre> tag to preserve the exact spacing of the ASCII art.
 * Scales down on mobile using CSS transform to keep it readable.
 */

export default function AsciiLogo() {
  return (
    <div className="overflow-hidden py-8 flex justify-center">
      <pre className="text-gray-600 text-[10px] leading-tight scale-[0.4] sm:scale-[0.5] md:scale-[0.65] lg:scale-75 whitespace-pre">
{`       ...                                        ..       ..       ..                                  ..
   .x888888hx    :                          x .d88"  x .d88"  . uW8"                              < .z@8"\`
  d88888888888hxx   .d\`\`                     5888R    5888R   \`t888              u.          u.    !@88E
 8" ... \`"*8888%\`   @8Ne.   .u        .u     '888R    '888R    8888   .    ...ue888b   ...ue888b   '888E   u
!  "   \` .xnxx.     %8888:u@88N    ud8888.    888R     888R    9888.z88N   888R Y888r  888R Y888r   888E u@8NL
X X   .H8888888%:    \`888I  888. :888'8888.   888R     888R    9888  888E  888R I888>  888R I888>   888E\`"88*"
X 'hn8888888*"   >    888I  888I d888 '88%"   888R     888R    9888  888E  888R I888>  888R I888>   888E .dN.
X: \`*88888%\`     !    888I  888I 8888.+"      888R     888R    9888  888E  888R I888>  888R I888>   888E~8888
'8h.. \`\`     ..x8>  uW888L  888' 8888L        888R     888R    9888  888E u8888cJ888  u8888cJ888    888E '888&
 \`88888888888888f  '*88888Nu88P  '8888c. .+  .888B .  .888B . .8888  888"  "*888*P"    "*888*P"     888E  9888.
  '%8888888888*"   ~ '88888F\`     "88888%    ^*888%   ^*888%   \`%888*%"      'Y"         'Y"      '"888*" 4888"
     ^"****""\`        888 ^         "YP'       "%       "%        "\`                                 ""    ""
                      *8E
                      '8>
                       "                                                                                        `}
      </pre>
    </div>
  );
}
