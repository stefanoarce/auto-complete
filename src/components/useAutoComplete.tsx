import React, { useRef, useState } from "react";

const KEY_CODES = {
  DOWN: 40,
  UP: 38,
  PAGE_DOWN: 34,
  ESCAPE: 27,
  PAGE_UP: 33,
  ENTER: 13,
};

type SearchFn = (search: string) => Promise<suggestions[]>;

interface suggestions {
  value: number;
  label: string;
}

export default function useAutoComplete(source: SearchFn) {
  const listRef = useRef<any>();
  const [suggestions, setSuggestions] = useState<suggestions[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [textValue, setTextValue] = useState("");

  function selectOption(index: number) {
    if (index > -1) {
      setTextValue(suggestions[index].label);
    }
    clearSuggestions();
  }

  async function getSuggestions(searchTerm: string) {
    if (searchTerm && source) {
      const options = await source(searchTerm);
      setSuggestions(options);
      setIsLoading(false);
    }
  }

  function clearSuggestions() {
    setSuggestions([]);
    setSelectedIndex(-1);
  }

  function onTextChange(searchTerm: string) {
    setIsLoading(true);
    setTextValue(searchTerm);
    clearSuggestions();
    getSuggestions(searchTerm);
  }

  const optionHeight = listRef?.current?.children[0]?.clientHeight;

  function scrollUp() {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
    if (listRef?.current?.scrollTop) listRef.current.scrollTop -= optionHeight;
  }

  function scrollDown() {
    if (selectedIndex < suggestions.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
    listRef.current.scrollTop = selectedIndex * optionHeight;
  }

  function pageDown() {
    setSelectedIndex(suggestions.length - 1);
    listRef.current.scrollTop = suggestions.length * optionHeight;
  }

  function pageUp() {
    setSelectedIndex(0);
    listRef.current.scrollTop = 0;
  }

  function onKeyDown(e: { keyCode: number }) {
    const keyOperation = {
      [KEY_CODES.DOWN]: scrollDown,
      [KEY_CODES.UP]: scrollUp,
      [KEY_CODES.ENTER]: () => selectOption(selectedIndex),
      [KEY_CODES.ESCAPE]: clearSuggestions,
      [KEY_CODES.PAGE_DOWN]: pageDown,
      [KEY_CODES.PAGE_UP]: pageUp,
    };
    if (keyOperation[e.keyCode]) {
      keyOperation[e.keyCode]();
    } else {
      setSelectedIndex(-1);
    }
  }

  return {
    bindOption: {
      onClick: (e: any) => {
        let nodes = Array.from(listRef.current.children);
        selectOption(nodes.indexOf(e.target.closest("li")));
      },
    },
    bindInput: {
      value: textValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        onTextChange(e.target.value),
      onKeyDown,
    },
    bindOptions: {
      ref: listRef,
    },
    isLoading,
    suggestions,
    selectedIndex,
  };
}
