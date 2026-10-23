import Link from "next/dist/client/link";
import React from "react";

export default function BankDetails() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/Admission/PaymentAndBankDetails/Zenit">Zenit Bank</Link>
        </li>
        <li>
          <Link href="/Admission/PaymentAndBankDetails/Commscial">
            Commecial Bank
          </Link>
        </li>
      </ul>
    </div>
  );
}
