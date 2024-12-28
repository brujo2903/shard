import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

export type TradingTableType = 'positions' | 'balances' | 'orders' | 'history';

interface TradingTableProps {
  type: TradingTableType;
}

export function TradingTable({ type }: TradingTableProps) {
  const columns: Record<TradingTableType, string[]> = {
    positions: ['Asset', 'Size', 'Entry Price', 'Mark Price', 'PnL', 'Actions'],
    balances: ['Asset', 'Available', 'In Orders', 'Total'],
    orders: ['Asset', 'Type', 'Size', 'Price', 'Filled', 'Status'],
    history: ['Time', 'Asset', 'Type', 'Size', 'Price', 'Total'],
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns[type].map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Add sample data rows here */}
      </TableBody>
    </Table>
  );
}