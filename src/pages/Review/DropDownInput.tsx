import * as Popover from "@radix-ui/react-popover";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as TablerIcons from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  chosen?: string;
  placeholder: string;
  items: any[];
  setState: (item: string) => void;
  fetcher: () => void;
};

const DropDownInput = ({
  chosen,
  placeholder,
  items,
  setState,
  fetcher,
}: Props) => {
  const [search, setSearch] = useState<string>("");

  const filteredItems =
    search!.length > 0 ? items.filter((item) => item.includes(search!)) : [];

  return (
    <Popover.Root onOpenChange={() => fetcher()}>
      <Popover.Trigger className="flex w-full justify-between rounded-md bg-gray-100 px-4 py-4  ">
        {chosen ? (
          <span className="font-bold text-gray-500">{chosen}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <TablerIcons.IconSelector />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="shadow- mx-3 select-none rounded-md bg-gray-100 p-4 text-text-dark">
          <ScrollArea.Root className="h-[240px] w-full min-w-[240px] overflow-hidden">
            <input
              className="rounded-md p-2 px-4 text-gray-500 placeholder:text-gray-300"
              type="text"
              placeholder="Pesquise aqui..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <ScrollArea.Viewport className="h-full w-full rounded">
              {search.length > 0 ? (
                <ul>
                  {filteredItems.map((tag) => (
                    <div
                      className="border-b border-b-gray-300 py-4 text-sm leading-tight text-gray-500 hover:cursor-pointer"
                      key={tag}
                      onClick={() => setState(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </ul>
              ) : (
                <ul>
                  {items.map((item) => (
                    <div
                      className="border-b border-b-gray-300 py-4 text-sm leading-tight text-gray-500 hover:cursor-pointer"
                      key={item.id}
                      onClick={() => setState(item.name)}
                    >
                      {item.name}
                    </div>
                  ))}
                </ul>
              )}
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar
              orientation="vertical"
              className="flex w-2 touch-none select-none rounded-lg bg-gray-200"
            >
              <ScrollArea.Thumb className="flex flex-1 cursor-pointer rounded-lg bg-gray-300" />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
          <Popover.Arrow
            height={10}
            width={20}
            className="right-0 fill-gray-100"
          />
          {/* <Popover.Close className="left-0 top-0 -z-10 h-screen w-screen bg-black" /> */}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DropDownInput;
