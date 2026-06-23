import { z } from "zod";

function nameSchema(name?: string) {
  return z.object({
    raw: name ? z.literal(name) : z.string(),
    local: name ? z.literal(name) : z.string(),
  });
}
const TextNode = z.object({
  type: z.literal("text"),
  text: z.string(),
});

function element<Attr extends z.ZodType, Children extends z.ZodType>(
  name: string,
  attributes: Attr,
  children: Children,
) {
  return z.object({
    type: z.literal("element"),
    name: nameSchema(name),
    attributes: attributes,
    children: children,
  });
}

const TermElement = element("term", z.any(), z.array(TextNode));
const TermNoteElement = element(
  "termNote",
  z.object({
    type: z.enum(["transferComment", "normativeAuthorization", "partOfSpeech"]),
  }),
  z.array(TextNode),
);
const AdminElement = element(
  "admin",
  z.object({
    type: z.enum(["source"]),
  }),
  z.array(TextNode),
);
const TermGrpElement = element(
  "termGrp",
  z.any(),
  z.array(z.union([TextNode, TermElement, TermNoteElement, AdminElement])),
);
const NtigElement = element("ntig", z.any(), z.array(z.union([TextNode, TermGrpElement])));

const DescripElement = element(
  "descrip",
  z.object({
    type: z.enum(["definition", "example"]),
  }),
  z.array(z.union([TextNode])),
);
const DescripGrpElement = element(
  "descripGrp",
  z.any(),
  z.array(z.union([TextNode, DescripElement])),
);

const LangSetElement = element(
  "langSet",
  z.object({
    "xml:lang": z.string(),
  }),
  z.array(z.union([TextNode, NtigElement, DescripGrpElement])),
);

const TermEntryElement = element(
  "termEntry",
  z.object({
    id: z.string(),
  }),
  z.array(z.union([TextNode, LangSetElement])),
);

export const Terms = z.object({
  root: element(
    "martif",
    z.object({
      type: z.string(),
      "xml:lang": z.string(),
    }),
    z.array(
      z.union([
        TextNode,
        element("martifHeader", z.any(), z.any()),
        element(
          "text",
          z.any(),
          z.array(
            z.union([
              TextNode,
              element("body", z.any(), z.array(z.union([TextNode, TermEntryElement]))),
            ]),
          ),
        ),
      ]),
    ),
  ),
});
