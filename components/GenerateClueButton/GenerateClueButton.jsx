import Button from "components/Button";
import Swal from "sweetalert2";

export default function GenerateClueButton({ clueLoading, clue }) {
  // const [clues, setClues] = useState(numberOfClues);
  // const { wordState, setWordState } = useContext(ButtonContext);
  // const { t } = useI18N();
  // const router = useRouter();

  const generateClue = async () => {
    Swal.fire({
      icon: "question",
      title: "Pista",
      text: `${clueLoading ? "La pista estará disponible pronto, vuelva en unos momentos" : clue}`,
    });
  };

  return (
    <Button onClick={() => generateClue(clueLoading, clue)} addBorder fitContent>
      Generar pista
    </Button>
  );
}
