import { component$ } from '@builder.io/qwik';
import type { Character } from '~/types/index';
import { getThumbnail } from '~/utils/index';

type Props = {
  character: Character;
};

export const CharacterCard = component$((props: Props) => (
  <div class="bg-base-200 w-48 overflow-hidden rounded">
    <div class="hover:scale-105 transition duration-300">
      <img
        alt={props.character.name || ""}
        width={192}
        height={288}
        class="object-cover object-top w-48 h-72"
        src={getThumbnail(props.character.thumbnail)}
      />
    </div>
    <p class="py-4 px-2 font-bold">{props.character.name}</p>
  </div>
));
