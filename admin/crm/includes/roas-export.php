<?php

require_once "dompdf/autoload.inc.php";

$dompdf = new Dompdf();

$dompdf->loadHtml('hello world');

$dompdf->setPaper('A4','portrait');

$dompdf->render();

$dompdf->stream();