import { component$, type QRL } from '@builder.io/qwik';
import type { Character } from '~/types';
import { CharacterCard } from '../character-card/CharacterCard';

type Props = {
  collection: Character[];
  currentPage: number;
  onMore$?: QRL<() => void>;
  total?: number;
  totalPages: number;
};

export const CharacterGrid = component$((props: Props) => (
  <section class="my-8">
    <div class="flex flex-col md:flex-row items-center gap-2 mb-4">
      <p class="text-xl">
        Total results
      </p>
      <div class="badge badge-lg">{props.total}</div>
    </div>
    <div class="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] justify-items-center gap-4">
      {props.collection.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
    {props.currentPage < props.totalPages && (
      <div class="flex justify-center mt-8">
        <button
          type="button"
          class="btn btn-primary text-base-content"
          onClick$={props.onMore$}
        >
          Show more
        </button>
      </div>
    )}
  </section>
));
