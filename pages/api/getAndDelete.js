import { onlineService } from "services/callsApi";

const CACHE = { id: 0, wordArray: "" };

export default async function handler(req, res) {
  const {
    query: { q },
  } = req;
  if (CACHE["id"] === q) {
    return res.status(200).json(CACHE["wordArray"]);
  }
  const wordArray = await onlineService({ id: q });
  CACHE["id"] = q;
  CACHE["wordArray"] = wordArray;

  return res.status(200).json(wordArray);
}
